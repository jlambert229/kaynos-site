import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { SeoHome } from "../components/Seo";
import { homeJsonLd } from "../seo/homeJsonLd";
import { faqJsonLd } from "../seo/faqJsonLd";
import { pricingJsonLd } from "../seo/pricingJsonLd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Eager imports (above-fold)
import Hero from "../sections/Hero";
import SocialProofBar from "../sections/SocialProofBar";
import Features from "../sections/Features";

// Lazy load below-fold sections
const HowItWorks = lazy(() => import("../sections/HowItWorks"));
const Demos = lazy(() => import("../sections/Demos"));
const Testimonials = lazy(() => import("../sections/Testimonials"));
const Story = lazy(() => import("../sections/Story"));
const Pricing = lazy(() => import("../sections/Pricing"));
const FAQ = lazy(() => import("../sections/FAQ"));
const CTA = lazy(() => import("../sections/CTA"));

export default function Home() {
  return (
    <>
      <SeoHome jsonLd={homeJsonLd} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(pricingJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProofBar />
        <Features />
        <Suspense fallback={null}>
          <HowItWorks />
          <Demos />
          <Testimonials />
          <Story />
          <Pricing />
          <FAQ />
          <CTA />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
