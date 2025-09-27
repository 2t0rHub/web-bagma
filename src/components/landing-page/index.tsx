import React, { useEffect } from "react";
import Header from "@/components/ui/Header.tsx";
import EmergencyContactWidget from "@/components/ui/EmergencyContactWidget.tsx";
import SectionProgressIndicator from "@/components/ui/SectionProgressIndicator.tsx";
import ConversionTrackingNavigation from "@/components/ui/ConversionTrackingNavigation.tsx";
import HeroSection from "@/components/landing-page/HeroSection.tsx";
import ProblemSection from "@/components/landing-page/ProblemSection.tsx";
import ServicesSection from "@/components/landing-page/ServicesSection.tsx";
import BenefitsSection from "@/components/landing-page/BenefitsSection.tsx";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection.tsx";
import PricingSection from "@/components/landing-page/PricingSection.tsx";
import ContactSection from "@/components/landing-page/ContactSection";
import FAQSection from "@/components/landing-page/FAQSection";
import Footer from "@/components/landing-page/Footer";

const LandingPage = () => {
  useEffect(() => {
    // Set page title
    document.title =
      "Grupo Bagma & R - Instalación Profesional HVAC | Aire Acondicionado y Calentadores";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute(
        "content",
        "Especialistas en instalación de aire acondicionado y calentadores de agua en España. 15+ años de experiencia, garantía 2 años, servicio 24/7. Presupuesto gratuito.",
      );
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Grupo Bagma & R",
      description:
        "Servicios profesionales de instalación y mantenimiento HVAC",
      url: window.location?.href,
      telephone: "+34900123456",
      email: "info@grupobagma.es",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 40.4168,
          longitude: -3.7038,
        },
      },
      services: [
        "Instalación Aire Acondicionado",
        "Calentadores de Agua",
        "Mantenimiento HVAC",
        "Reparaciones de Emergencia",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2847",
      },
      openingHours: "Mo-Su 00:00-23:59",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head?.appendChild(script);

    // Cleanup function
    return () => {
      document.head?.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation & Tracking */}
      <Header />
      <ConversionTrackingNavigation />
      <SectionProgressIndicator />
      <EmergencyContactWidget />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
