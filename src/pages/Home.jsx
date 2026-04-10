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
import Features from "../sections/Features";

// Lazy load below-fold sections
const Comparison = lazy(() => import("../sections/Comparison"));
const HowItWorks = lazy(() => import("../sections/HowItWorks"));
const Demos = lazy(() => import("../sections/Demos"));
const UseCases = lazy(() => import("../sections/UseCases"));
const Testimonials = lazy(() => import("../sections/Testimonials"));
const Story = lazy(() => import("../sections/Story"));
const Pricing = lazy(() => import("../sections/Pricing"));
const FAQ = lazy(() => import("../sections/FAQ"));
const Newsletter = lazy(() => import("../sections/Newsletter"));
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
        <Features />
        <Suspense fallback={null}>
          <Comparison />
          <HowItWorks />
          <Demos />
          <UseCases />
          <Testimonials />
          <Story />
          <Pricing />
          <FAQ />
          <Newsletter />
          <CTA />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
