import { Helmet } from "react-helmet-async";
import Seo from "../components/Seo";
import { homeJsonLd } from "../seo/homeJsonLd";
import { faqJsonLd } from "../seo/faqJsonLd";
import { pricingJsonLd } from "../seo/pricingJsonLd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";

import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Comparison from "../sections/Comparison";
import HowItWorks from "../sections/HowItWorks";
import Demos from "../sections/Demos";
import UseCases from "../sections/UseCases";
import Testimonials from "../sections/Testimonials";
import Story from "../sections/Story";
import PrivacyCallout from "../sections/PrivacyCallout";
import Pricing from "../sections/Pricing";
import FAQ from "../sections/FAQ";
import Newsletter from "../sections/Newsletter";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <>
      <Seo title="Video review for BJJ coaches" path="/" jsonLd={homeJsonLd} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(pricingJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <ErrorBoundary><Comparison /></ErrorBoundary>
        <ErrorBoundary><HowItWorks /></ErrorBoundary>
        <ErrorBoundary><Demos /></ErrorBoundary>
        <ErrorBoundary>
          <UseCases />
          <Story />
        </ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><PrivacyCallout /></ErrorBoundary>
        <ErrorBoundary>
          <Pricing />
          <FAQ />
        </ErrorBoundary>
        <ErrorBoundary>
          <Newsletter />
          <CTA />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
