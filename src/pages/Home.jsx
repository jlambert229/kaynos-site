import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import Demos from "../sections/Demos";
import Features from "../sections/Features";
import HowItWorks from "../sections/HowItWorks";
import Pricing from "../sections/Pricing";
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Demos />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
