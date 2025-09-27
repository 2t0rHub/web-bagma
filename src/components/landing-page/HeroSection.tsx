import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import Icon from "../AppIcon";

const HeroSection = () => {
  const [currentTemp, setCurrentTemp] = useState(28);
  const [isEmergency, setIsEmergency] = useState(false);

  useEffect(() => {
    // Simulate temperature updates
    const interval = setInterval(() => {
      setCurrentTemp((prev) => prev + (Math.random() - 0.5) * 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleQuoteRequest = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:+34900123456";
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-primary absolute top-20 left-10 h-32 w-32 rounded-full"></div>
        <div className="bg-secondary absolute top-40 right-20 h-24 w-24 rounded-full"></div>
        <div className="bg-primary absolute bottom-40 left-1/4 h-16 w-16 rounded-full"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8">
            {/* Emergency Badge */}
            <div className="bg-urgency/10 text-urgency border-urgency/20 inline-flex items-center space-x-2 rounded-full border px-4 py-2">
              <div className="bg-urgency h-2 w-2 animate-pulse rounded-full"></div>
              <span className="text-sm font-medium">
                Servicio de Emergencia 24/7 Disponible
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-text-primary text-4xl leading-tight font-bold lg:text-6xl">
                Instalación Profesional de{" "}
                <span className="text-primary">Aire Acondicionado</span> y{" "}
                <span className="text-secondary">Calentadores de Agua</span>
              </h1>
              <p className="text-text-secondary text-xl leading-relaxed">
                Especialistas certificados con más de 15 años de experiencia.
                Garantía de calidad, precios transparentes y servicio de
                emergencia 24/7.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="border-border grid grid-cols-3 gap-6 border-t border-b py-6">
              <div className="text-center">
                <div className="text-primary text-2xl font-bold">15+</div>
                <div className="text-text-secondary text-sm">
                  Años de Experiencia
                </div>
              </div>
              <div className="text-center">
                <div className="text-success text-2xl font-bold">2,847</div>
                <div className="text-text-secondary text-sm">
                  Instalaciones Completadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-secondary text-2xl font-bold">24/7</div>
                <div className="text-text-secondary text-sm">
                  Servicio de Emergencia
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="default"
                size="lg"
                iconName="Calculator"
                iconPosition="left"
                onClick={handleQuoteRequest}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Solicitar Presupuesto Gratuito
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                onClick={handleEmergencyCall}
                className="border-urgency text-urgency hover:bg-urgency hover:text-white"
              >
                Llamar Ahora: 900 123 456
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="text-text-secondary flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Garantía 2 años</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-warning" />
                <span>Hasta 30% ahorro energético</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>Instalación en 24h</span>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            {/* Temperature Widget */}
            <div className="shadow-card border-border mb-6 rounded-2xl border bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-text-primary font-semibold">
                  Temperatura Actual
                </h3>
                <Icon name="Thermometer" size={24} className="text-urgency" />
              </div>
              <div className="text-center">
                <div className="text-urgency mb-2 text-4xl font-bold">
                  {currentTemp?.toFixed(1)}°C
                </div>
                <p className="text-text-secondary text-sm">
                  {currentTemp > 26
                    ? "Demasiado caliente"
                    : currentTemp < 18
                      ? "Demasiado frío"
                      : "Temperatura ideal"}
                </p>
                {currentTemp > 26 && (
                  <div className="bg-urgency/10 mt-4 rounded-lg p-3">
                    <p className="text-urgency text-sm font-medium">
                      ¡Necesitas aire acondicionado profesional!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="shadow-card border-border hover:shadow-subtle transition-smooth rounded-xl border bg-white p-4">
                <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon name="Wind" size={24} className="text-primary" />
                </div>
                <h4 className="text-text-primary mb-1 font-semibold">
                  Aire Acondicionado
                </h4>
                <p className="text-text-secondary text-sm">
                  Instalación y mantenimiento profesional
                </p>
              </div>
              <div className="shadow-card border-border hover:shadow-subtle transition-smooth rounded-xl border bg-white p-4">
                <div className="bg-secondary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon name="Droplets" size={24} className="text-secondary" />
                </div>
                <h4 className="text-text-primary mb-1 font-semibold">
                  Calentadores
                </h4>
                <p className="text-text-secondary text-sm">
                  Agua caliente eficiente y confiable
                </p>
              </div>
            </div>

            {/* Emergency Indicator */}
            <div className="bg-urgency shadow-card absolute -top-4 -right-4 animate-pulse rounded-full p-3 text-white">
              <Icon name="Zap" size={20} />
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;
