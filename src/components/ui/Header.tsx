import React, { useState, useEffect } from "react";
import Icon from "@/components/AppIcon";
import { Button } from "@/components/ui/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("servicios");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { id: "servicios", label: "Servicios", href: "#servicios" },
    { id: "precios", label: "Precios", href: "#precios" },
    { id: "garantias", label: "Garantías", href: "#garantias" },
    { id: "testimonios", label: "Testimonios", href: "#testimonios" },
    { id: "contacto", label: "Contacto", href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = navigationItems?.map((item) => item?.id);
      const currentSection = sections?.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element?.getBoundingClientRect();
          return rect?.top <= 100 && rect?.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
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
    setIsMenuOpen(false);
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:+34900123456";
  };

  return (
    <header
      className={`transition-smooth fixed top-0 right-0 left-0 z-100 ${
        isScrolled ? "shadow-subtle bg-white" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon name="Wrench" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-text-primary text-xl font-bold">
                  Grupo Bagma & R
                </h1>
                <p className="text-text-secondary text-xs">
                  Servicios HVAC Profesionales
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleNavClick(item?.href)}
                className={`transition-smooth hover:text-primary text-sm font-medium ${
                  activeSection === item?.id
                    ? "text-primary border-primary border-b-2 pb-1"
                    : "text-text-primary"
                }`}
              >
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Emergency Contact & CTA */}
          <div className="hidden items-center space-x-4 lg:flex">
            <div className="text-right">
              <p className="text-text-secondary text-xs">Emergencias 24/7</p>
              <button
                onClick={handleEmergencyCall}
                className="text-urgency hover:text-urgency/80 transition-smooth text-lg font-semibold"
              >
                900 123 456
              </button>
            </div>
            <Button
              variant="default"
              size="default"
              iconName="Phone"
              iconPosition="left"
              onClick={handleEmergencyCall}
              className="bg-primary hover:bg-primary/90"
            >
              Llamar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              onClick={handleEmergencyCall}
              className="text-urgency border-urgency hover:bg-urgency hover:text-white"
            >
              Llamar
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-muted transition-smooth rounded-lg p-2"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-border shadow-card absolute top-full right-0 left-0 border-t bg-white lg:hidden">
            <div className="space-y-3 px-5 py-4">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => handleNavClick(item?.href)}
                  className={`transition-smooth block w-full rounded-lg px-4 py-3 text-left ${
                    activeSection === item?.id
                      ? "bg-primary text-white"
                      : "text-text-primary hover:bg-muted"
                  }`}
                >
                  {item?.label}
                </button>
              ))}
              <div className="border-border border-t pt-3">
                <div className="bg-urgency/5 flex items-center justify-between rounded-lg p-4">
                  <div>
                    <p className="text-text-primary text-sm font-medium">
                      Emergencias 24/7
                    </p>
                    <p className="text-urgency text-lg font-bold">
                      900 123 456
                    </p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Phone"
                    onClick={handleEmergencyCall}
                    className="bg-urgency hover:bg-urgency/90"
                  >
                    Llamar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
