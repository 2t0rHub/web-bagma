import React, { useEffect, useRef } from "react";

const ConversionTrackingNavigation = () => {
  const trackingData = useRef({
    pageLoadTime: Date.now(),
    sectionViews: {},
    navigationClicks: {},
    conversionEvents: [],
    scrollDepth: 0,
    timeOnPage: 0,
  });

  const sections = [
    "hero",
    "servicios",
    "precios",
    "garantias",
    "testimonios",
    "contacto",
    "emergencias",
  ];

  useEffect(() => {
    // Track page load and initial setup
    const startTime = Date.now();
    trackingData.current.pageLoadTime = startTime;

    // Track scroll depth and section visibility
    const handleScroll = () => {
      const winScroll =
        document.body?.scrollTop || document.documentElement?.scrollTop;
      const height =
        document.documentElement?.scrollHeight -
        document.documentElement?.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);

      trackingData.current.scrollDepth = Math.max(
        trackingData?.current?.scrollDepth,
        scrolled,
      );
      trackingData.current.timeOnPage = Date.now() - startTime;

      // Track section views
      sections?.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element?.getBoundingClientRect();
          const isVisible = rect?.top < window.innerHeight && rect?.bottom > 0;

          if (isVisible && !trackingData?.current?.sectionViews?.[sectionId]) {
            trackingData.current.sectionViews[sectionId] = {
              timestamp: Date.now(),
              timeFromPageLoad: Date.now() - startTime,
              scrollPosition: scrolled,
            };

            // Send section view event
            trackEvent("section_view", {
              section: sectionId,
              timeFromPageLoad: Date.now() - startTime,
              scrollPosition: scrolled,
            });
          }
        }
      });
    };

    // Track navigation clicks
    const handleNavClick = (event) => {
      const target = event?.target?.closest("a, button");
      if (target) {
        const href =
          target?.getAttribute("href") || target?.getAttribute("data-href");
        const text = target?.textContent?.trim();

        if (href && href?.startsWith("#")) {
          const sectionId = href?.substring(1);

          if (!trackingData?.current?.navigationClicks?.[sectionId]) {
            trackingData.current.navigationClicks[sectionId] = 0;
          }
          trackingData.current.navigationClicks[sectionId]++;

          trackEvent("navigation_click", {
            section: sectionId,
            linkText: text,
            timeFromPageLoad: Date.now() - startTime,
            clickCount: trackingData?.current?.navigationClicks?.[sectionId],
          });
        }
      }
    };

    // Track conversion events
    const trackConversionEvent = (eventType, data = {}) => {
      const conversionEvent = {
        type: eventType,
        timestamp: Date.now(),
        timeFromPageLoad: Date.now() - startTime,
        scrollDepth: trackingData?.current?.scrollDepth,
        sectionsViewed: Object.keys(trackingData?.current?.sectionViews)
          ?.length,
        ...data,
      };

      trackingData?.current?.conversionEvents?.push(conversionEvent);

      trackEvent("conversion", conversionEvent);
    };

    // Track phone calls
    const handlePhoneClick = (event) => {
      const target = event?.target?.closest(
        'a[href^="tel:"], button[onclick*="tel:"]',
      );
      if (target) {
        trackConversionEvent("phone_call", {
          phoneNumber: target?.getAttribute("href") || "emergency",
          source:
            target?.closest("[data-source]")?.getAttribute("data-source") ||
            "unknown",
        });
      }
    };

    // Track form submissions
    const handleFormSubmit = (event) => {
      const form = event?.target?.closest("form");
      if (form) {
        const formId = form?.id || form?.className || "unknown";
        trackConversionEvent("form_submission", {
          formId: formId,
          formType: form?.getAttribute("data-form-type") || "contact",
        });
      }
    };

    // Track WhatsApp clicks
    const handleWhatsAppClick = (event) => {
      const target = event?.target?.closest(
        'a[href*="wa.me"], button[onclick*="wa.me"]',
      );
      if (target) {
        trackConversionEvent("whatsapp_click", {
          source:
            target?.closest("[data-source]")?.getAttribute("data-source") ||
            "unknown",
        });
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleNavClick);
    document.addEventListener("click", handlePhoneClick);
    document.addEventListener("click", handleWhatsAppClick);
    document.addEventListener("submit", handleFormSubmit);

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent("page_hidden", {
          timeOnPage: Date.now() - startTime,
          scrollDepth: trackingData?.current?.scrollDepth,
          sectionsViewed: Object.keys(trackingData?.current?.sectionViews)
            ?.length,
        });
      } else {
        trackEvent("page_visible", {
          timeFromPageLoad: Date.now() - startTime,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track page unload
    const handleBeforeUnload = () => {
      const finalData = {
        totalTimeOnPage: Date.now() - startTime,
        maxScrollDepth: trackingData?.current?.scrollDepth,
        sectionsViewed: Object.keys(trackingData?.current?.sectionViews)
          ?.length,
        navigationClicks: Object.keys(trackingData?.current?.navigationClicks)
          ?.length,
        conversionEvents: trackingData?.current?.conversionEvents?.length,
        sectionViewData: trackingData?.current?.sectionViews,
        conversionData: trackingData?.current?.conversionEvents,
      };

      // Send final tracking data
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/session-end",
          JSON.stringify(finalData),
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Initial scroll check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleNavClick);
      document.removeEventListener("click", handlePhoneClick);
      document.removeEventListener("click", handleWhatsAppClick);
      document.removeEventListener("submit", handleFormSubmit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Generic event tracking function
  const trackEvent = (eventType, data) => {
    // Console log for development
    console.log(`[Analytics] ${eventType}:`, data);

    // Send to analytics service (replace with your analytics provider)
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", eventType, data);
    }

    // Send to custom analytics endpoint
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics/event",
        JSON.stringify({
          event: eventType,
          data: data,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location?.href,
        }),
      );
    }
  };

  // Expose tracking functions globally for manual tracking
  useEffect(() => {
    window.trackConversion = (type, data) => {
      const conversionEvent = {
        type: type,
        timestamp: Date.now(),
        timeFromPageLoad: Date.now() - trackingData?.current?.pageLoadTime,
        scrollDepth: trackingData?.current?.scrollDepth,
        sectionsViewed: Object.keys(trackingData?.current?.sectionViews)
          ?.length,
        ...data,
      };

      trackingData?.current?.conversionEvents?.push(conversionEvent);
      trackEvent("manual_conversion", conversionEvent);
    };

    window.getTrackingData = () => trackingData?.current;
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ConversionTrackingNavigation;
