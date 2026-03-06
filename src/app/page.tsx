import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Refresh data otomatis dari Supabase tiap 60 detik

export default async function Home() {
    // Fetch reviews di server agar halaman langsung tampil tanpa loading
    const { data: reviews } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Schedule />
            <Reviews initialReviews={reviews ?? []} />
            <Footer />
        </>
    );
}
