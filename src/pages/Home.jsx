import { Helmet } from "react-helmet-async";
import { SeoHome } from "../components/Seo";
import { homeJsonLd } from "../seo/homeJsonLd";
import { faqJsonLd } from "../seo/faqJsonLd";
import { pricingJsonLd } from "../seo/pricingJsonLd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import Demos from "../sections/Demos";
import Features from "../sections/Features";
import HowItWorks from "../sections/HowItWorks";
import Story from "../sections/Story";
import Pricing from "../sections/Pricing";
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <>
      <SeoHome jsonLd={homeJsonLd} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(pricingJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Demos />
        <Features />
        <HowItWorks />
        <Story />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
