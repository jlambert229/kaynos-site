import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Seo from "../components/Seo";
import { homeJsonLd } from "../seo/homeJsonLd";
import { faqJsonLd } from "../seo/faqJsonLd";
import { pricingJsonLd } from "../seo/pricingJsonLd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";

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
      <Seo title="Kaynos | Keep your clients improving between sessions." path="/" jsonLd={homeJsonLd} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(pricingJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <ErrorBoundary><Suspense fallback={null}>
          <Comparison />
        </Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}>
          <HowItWorks />
        </Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}>
          <Demos />
        </Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}>
          <UseCases />
          <Story />
        </Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}>
          <Testimonials />
        </Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}>
          <Pricing />
          <FAQ />
        </Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}>
          <Newsletter />
          <CTA />
        </Suspense></ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
