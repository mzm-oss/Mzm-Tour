import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

// Menggunakan ISR (Incremental Static Regeneration)
// Halaman akan di-cache super cepat, dan diperbarui secara otomatis di background setiap 60 detik
// atau saat ada testimoni baru yang di-submit (lewat API revalidatePath)
export const revalidate = 60;

// Halaman Utama
export default async function Home() {
    // Fetch reviews di server agar halaman langsung tampil tanpa loading
    const { data: reviews } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    // Fetch pengaturan global untuk form review
    const { data: settings } = await supabase
        .from("global_settings")
        .select("reviews_enabled")
        .eq("id", 1)
        .single();
    const reviewsEnabled = settings ? settings.reviews_enabled !== false : true;

    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Schedule />
            <Reviews initialReviews={reviews ?? []} reviewsEnabled={reviewsEnabled} />
            <Footer />
        </>
    );
}
