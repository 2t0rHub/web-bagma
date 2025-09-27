import React, { useState, useEffect } from "react";

const SectionProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "precios", label: "Precios" },
    { id: "garantias", label: "Garantías" },
    { id: "testimonios", label: "Testimonios" },
    { id: "contacto", label: "Contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const winScroll =
        document.body?.scrollTop || document.documentElement?.scrollTop;
      const height =
        document.documentElement?.scrollHeight -
        document.documentElement?.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Determine active section
      const sectionElements = sections
        ?.map((section) => ({
          ...section,
          element: document.getElementById(section?.id),
        }))
        ?.filter((section) => section?.element);

      let currentSectionIndex = 0;
      sectionElements?.forEach((section, index) => {
        const rect = section?.element?.getBoundingClientRect();
        if (
          rect?.top <= window.innerHeight / 2 &&
          rect?.bottom >= window.innerHeight / 2
        ) {
          currentSectionIndex = index;
        }
      });

      setActiveSection(currentSectionIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element?.getBoundingClientRect()?.top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Desktop Progress Indicator - Left Side */}
      <div className="fixed top-1/2 left-6 z-100 hidden -translate-y-1/2 transform xl:block">
        <div className="shadow-card border-border rounded-full border bg-white/90 p-4 backdrop-blur-sm">
          {/* Overall Progress Circle */}
          <div className="relative mb-6 h-16 w-16">
            <svg className="h-16 w-16 -rotate-90 transform" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
                className="text-primary transition-smooth"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-text-primary text-xs font-semibold">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>

          {/* Section Dots */}
          <div className="space-y-4">
            {sections?.map((section, index) => (
              <button
                key={section?.id}
                onClick={() => handleSectionClick(section?.id)}
                className="group relative flex items-center"
                title={section?.label}
              >
                <div
                  className={`transition-smooth h-3 w-3 rounded-full ${
                    index === activeSection
                      ? "bg-primary scale-125"
                      : index < activeSection
                        ? "bg-success"
                        : "bg-muted border-border border-2"
                  }`}
                ></div>

                {/* Tooltip */}
                <div className="bg-text-primary transition-smooth pointer-events-none absolute left-full ml-3 rounded px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 group-hover:opacity-100">
                  {section?.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Progress Bar - Top */}
      <div className="fixed top-20 right-0 left-0 z-100 xl:hidden">
        <div className="border-border border-b bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex items-center justify-between py-2">
              <span className="text-text-secondary text-xs font-medium">
                Progreso de la página
              </span>
              <span className="text-primary text-xs font-semibold">
                {Math.round(scrollProgress)}%
              </span>
            </div>
            <div className="bg-muted h-1 overflow-hidden rounded-full">
              <div
                className="bg-primary transition-smooth h-full rounded-full"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Section Dots - Bottom */}
      <div className="fixed bottom-20 left-1/2 z-100 -translate-x-1/2 transform xl:hidden">
        <div className="shadow-card border-border rounded-full border bg-white/90 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            {sections?.map((section, index) => (
              <button
                key={section?.id}
                onClick={() => handleSectionClick(section?.id)}
                className={`transition-smooth h-2 w-2 rounded-full ${
                  index === activeSection
                    ? "bg-primary scale-150"
                    : index < activeSection
                      ? "bg-success"
                      : "bg-muted"
                }`}
                title={section?.label}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionProgressIndicator;
