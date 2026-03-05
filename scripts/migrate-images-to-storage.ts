import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';

// Load .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateImages() {
    console.log('Starting migration...');

    // Fetch all pakets that have image as base64
    const { data: pakets, error: fetchError } = await supabase
        .from('pakets')
        .select('id, image, nama')
        .not('image', 'is', null)
        .like('image', 'data:image%');

    if (fetchError) {
        console.error('Error fetching pakets:', fetchError);
        return;
    }

    console.log(`Found ${pakets.length} pakets with base64 images.`);

    for (const paket of pakets) {
        try {
            console.log(`Migrating image for paket: ${paket.nama} (${paket.id})`);

            // Extract base64 data and mime type
            const matches = paket.image.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                console.log(`- Skipping ${paket.id}: Not a valid base64 format`);
                continue;
            }

            const mimeType = matches[1]; // e.g., 'image/png'
            const base64Data = matches[2];

            // Determine extension
            const ext = mimeType.split('/')[1] || 'png';
            const fileName = `${paket.id}-${Date.now()}.${ext}`;

            // Convert to buffer
            const buffer = Buffer.from(base64Data, 'base64');

            // Upload to Supabase Storage
            console.log(`- Uploading to bucket 'paket-images' as ${fileName}...`);
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('paket-images')
                .upload(fileName, buffer, {
                    contentType: mimeType,
                    upsert: true
                });

            if (uploadError) {
                throw new Error(`Upload failed: ${uploadError.message}`);
            }

            // Get public URL
            const { data: publicUrlData } = supabase
                .storage
                .from('paket-images')
                .getPublicUrl(fileName);

            const publicUrl = publicUrlData.publicUrl;
            console.log(`- Uploaded! URL: ${publicUrl}`);

            // Update the paket row
            console.log(`- Updating database row...`);
            const { error: updateError } = await supabase
                .from('pakets')
                .update({ image: publicUrl })
                .eq('id', paket.id);

            if (updateError) {
                throw new Error(`DB Update failed: ${updateError.message}`);
            }

            console.log(`✅ Successfully migrated image for ${paket.id}`);

        } catch (err: any) {
            console.error(`❌ Failed migrating image for ${paket.id}:`, err.message);
        }
    }

    console.log('Migration completed!');
}

migrateImages();
