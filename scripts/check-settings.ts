import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data, error } = await supabase.from('settings').select('*').limit(1);
    if (error) {
        console.log("No settings table or error:", error.message);
    } else {
        console.log("Settings table exists:", data);
    }
}
main();
