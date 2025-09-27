import React, { useState, useEffect } from "react";
import Icon from "../AppIcon";

const BenefitsSection = () => {
  const [animatedValues, setAnimatedValues] = useState({
    warranty: 0,
    savings: 0,
    response: 0,
  });

  const benefits = [
    {
      icon: "Shield",
      title: "Garantía Extendida",
      description:
        "Protección completa de tu inversión con garantía de instalación y equipos",
      metric: "2 años",
      details: [
        "Garantía de instalación 2 años",
        "Garantía de equipos hasta 5 años",
        "Servicio técnico gratuito",
        "Repuestos originales incluidos",
      ],
      color: "primary",
    },
    {
      icon: "Zap",
      title: "Eficiencia Energética",
      description:
        "Reduce significativamente tus facturas con equipos de última generación",
      metric: "30% ahorro",
      details: [
        "Sistemas inverter A+++",
        "Tecnología eco-friendly",
        "Optimización automática",
        "Monitoreo de consumo",
      ],
      color: "success",
    },
    {
      icon: "Clock",
      title: "Respuesta Rápida",
      description:
        "Servicio de emergencia disponible 24/7 con tiempo de respuesta garantizado",
      metric: "24 horas",
      details: [
        "Emergencias 24/7",
        "Respuesta en 2 horas",
        "Técnicos certificados",
        "Diagnóstico gratuito",
      ],
      color: "urgency",
    },
  ];

  const additionalBenefits = [
    {
      icon: "Users",
      title: "Equipo Certificado",
      description:
        "Técnicos con certificaciones oficiales y años de experiencia",
    },
    {
      icon: "Award",
      title: "Calidad Garantizada",
      description: "Trabajamos solo con las mejores marcas del mercado",
    },
    {
      icon: "Headphones",
      title: "Soporte Continuo",
      description: "Atención al cliente personalizada antes, durante y después",
    },
    {
      icon: "MapPin",
      title: "Cobertura Local",
      description: "Servicio en toda la comunidad con técnicos locales",
    },
    {
      icon: "CreditCard",
      title: "Financiación",
      description: "Opciones de pago flexibles y financiación sin intereses",
    },
    {
      icon: "Recycle",
      title: "Eco-Responsable",
      description: "Reciclaje de equipos antiguos y soluciones sostenibles",
    },
  ];

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedValues({
          warranty: Math.floor(2 * progress),
          savings: Math.floor(30 * progress),
          response: Math.floor(24 * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues({
            warranty: 2,
            savings: 30,
            response: 24,
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    const element = document.getElementById("benefits-section");
    if (element) {
      observer?.observe(element);
    }

    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="benefits-section"
      className="from-muted bg-gradient-to-b to-white py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-success/10 text-success mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="Star" size={16} />
            <span className="text-sm font-medium">Beneficios Exclusivos</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            ¿Por Qué Elegir{" "}
            <span className="text-primary">Grupo Bagma & R</span>?
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Más de 15 años de experiencia nos respaldan. Conoce todos los
            beneficios que obtienes al confiar en nuestros servicios
            profesionales.
          </p>
        </div>

        {/* Main Benefits */}
        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="shadow-card border-border hover:shadow-subtle transition-smooth rounded-2xl border bg-white p-8"
            >
              <div className="text-center">
                <div
                  className={`h-20 w-20 bg-${benefit?.color}/10 mx-auto mb-6 flex items-center justify-center rounded-2xl`}
                >
                  <Icon
                    name={benefit?.icon}
                    size={32}
                    className={`text-${benefit?.color}`}
                  />
                </div>

                <div className="mb-6">
                  <div
                    className={`text-4xl font-bold text-${benefit?.color} mb-2`}
                  >
                    {index === 0 && `${animatedValues?.warranty}`}
                    {index === 1 && `${animatedValues?.savings}%`}
                    {index === 2 && `${animatedValues?.response}h`}
                  </div>
                  <h3 className="text-text-primary mb-3 text-xl font-semibold">
                    {benefit?.title}
                  </h3>
                  <p className="text-text-secondary">{benefit?.description}</p>
                </div>

                <div className="space-y-2">
                  {benefit?.details?.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <Icon
                        name="Check"
                        size={14}
                        className={`text-${benefit?.color}`}
                      />
                      <span className="text-text-secondary">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits Grid */}
        <div className="shadow-card border-border rounded-2xl border bg-white p-8">
          <div className="mb-8 text-center">
            <h3 className="text-text-primary mb-4 text-2xl font-bold">
              Beneficios Adicionales
            </h3>
            <p className="text-text-secondary">
              Servicios y ventajas que nos diferencian de la competencia
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalBenefits?.map((benefit, index) => (
              <div
                key={index}
                className="hover:bg-muted transition-smooth flex items-start space-x-4 rounded-xl p-4"
              >
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Icon
                    name={benefit?.icon}
                    size={20}
                    className="text-primary"
                  />
                </div>
                <div>
                  <h4 className="text-text-primary mb-1 font-semibold">
                    {benefit?.title}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {benefit?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="bg-success mt-16 rounded-2xl p-8 text-white">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <Icon name="ShieldCheck" size={32} />
                <h3 className="text-2xl font-bold">
                  Garantía de Satisfacción 100%
                </h3>
              </div>
              <p className="mb-4 text-lg opacity-90">
                Si no estás completamente satisfecho con nuestro trabajo, lo
                corregimos sin costo adicional o te devolvemos tu dinero.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Respuesta en 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>Soporte directo</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="mb-2 text-4xl font-bold">2,847</div>
              <div className="mb-4 text-lg opacity-90">
                Clientes Satisfechos
              </div>
              <div className="flex items-center justify-center space-x-1 lg:justify-end">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className="fill-current text-yellow-300"
                  />
                ))}
                <span className="ml-2 font-semibold">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
