import React, { useState } from "react";
import Icon from "../AppIcon";
import Image from "../AppImage";
import { Button } from "../ui/Button";

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      title: "Instalación de Aire Acondicionado",
      subtitle: "Sistemas de climatización eficientes",
      description:
        "Instalación profesional de sistemas de aire acondicionado con las mejores marcas del mercado. Evaluación energética gratuita y garantía extendida.",
      icon: "Wind",
      color: "primary",
      features: [
        "Evaluación energética gratuita",
        "Instalación en 24-48 horas",
        "Garantía de 2 años",
        "Mantenimiento incluido primer año",
        "Sistemas inverter de alta eficiencia",
        "Certificación energética A+++",
      ],
      beforeImage:
        "https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "Desde 899€",
      savings: "Hasta 30% ahorro energético",
    },
    {
      id: 1,
      title: "Calentadores de Agua",
      subtitle: "Agua caliente eficiente y confiable",
      description:
        "Instalación y reemplazo de calentadores de agua eléctricos y a gas. Soluciones personalizadas para cada hogar con máxima eficiencia energética.",
      icon: "Droplets",
      color: "secondary",
      features: [
        "Calentadores eléctricos y a gas",
        "Instalación certificada",
        "Garantía de fabricante extendida",
        "Servicio técnico especializado",
        "Sistemas de alta eficiencia",
        "Asesoramiento personalizado",
      ],
      beforeImage:
        "https://images.pexels.com/photos/8005032/pexels-photo-8005032.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "Desde 649€",
      savings: "Hasta 25% ahorro en gas",
    },
    {
      id: 2,
      title: "Mantenimiento HVAC",
      subtitle: "Cuidado preventivo profesional",
      description:
        "Planes de mantenimiento preventivo para maximizar la vida útil de tus equipos y mantener la máxima eficiencia energética durante todo el año.",
      icon: "Settings",
      color: "success",
      features: [
        "Revisiones programadas",
        "Limpieza profunda de equipos",
        "Detección temprana de problemas",
        "Optimización de rendimiento",
        "Planes anuales flexibles",
        "Servicio de emergencia prioritario",
      ],
      beforeImage:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "Desde 89€/año",
      savings: "Previene averías costosas",
    },
  ];

  const handleServiceSelect = (index) => {
    setActiveService(index);
  };

  const handleQuoteRequest = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicios" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="Wrench" size={16} />
            <span className="text-sm font-medium">Nuestros Servicios</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            Soluciones HVAC <span className="text-primary">Profesionales</span>{" "}
            para Tu Hogar
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Especialistas certificados en instalación, reparación y
            mantenimiento de sistemas de climatización y agua caliente.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="bg-muted mb-12 flex flex-col gap-4 rounded-2xl p-2 lg:flex-row">
          {services?.map((service, index) => (
            <button
              key={service?.id}
              onClick={() => handleServiceSelect(index)}
              className={`transition-smooth flex-1 rounded-xl p-4 text-left ${
                activeService === index
                  ? "shadow-card border-border border bg-white"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    activeService === index
                      ? `bg-${service?.color} text-white`
                      : `bg-${service?.color}/10 text-${service?.color}`
                  }`}
                >
                  <Icon name={service?.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">
                    {service?.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {service?.subtitle}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Service Details */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Service Info */}
          <div className="space-y-8">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <div
                  className={`h-16 w-16 bg-${services?.[activeService]?.color} flex items-center justify-center rounded-xl`}
                >
                  <Icon
                    name={services?.[activeService]?.icon}
                    size={32}
                    color="white"
                  />
                </div>
                <div>
                  <h3 className="text-text-primary text-2xl font-bold">
                    {services?.[activeService]?.title}
                  </h3>
                  <p className="text-text-secondary">
                    {services?.[activeService]?.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                {services?.[activeService]?.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <h4 className="text-text-primary mb-4 font-semibold">
                ¿Qué incluye nuestro servicio?
              </h4>
              {services?.[activeService]?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`h-6 w-6 bg-${services?.[activeService]?.color}/10 flex items-center justify-center rounded-full`}
                  >
                    <Icon
                      name="Check"
                      size={14}
                      className={`text-${services?.[activeService]?.color}`}
                    />
                  </div>
                  <span className="text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing & Savings */}
            <div className="bg-muted flex items-center justify-between rounded-xl p-6">
              <div>
                <div className="text-text-primary mb-1 text-2xl font-bold">
                  {services?.[activeService]?.price}
                </div>
                <div className="text-success text-sm font-medium">
                  {services?.[activeService]?.savings}
                </div>
              </div>
              <Button
                variant="default"
                iconName="Calculator"
                iconPosition="left"
                onClick={handleQuoteRequest}
                className={`bg-${services?.[activeService]?.color} hover:bg-${services?.[activeService]?.color}/90`}
              >
                Solicitar Presupuesto
              </Button>
            </div>
          </div>

          {/* Before/After Images */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={services?.[activeService]?.beforeImage}
                    alt="Antes del servicio"
                    className="h-48 w-full object-cover"
                  />
                  <div className="bg-urgency absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium text-white">
                    Antes
                  </div>
                </div>
                <p className="text-text-secondary text-center text-sm">
                  Estado inicial
                </p>
              </div>
              <div className="space-y-2">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={services?.[activeService]?.afterImage}
                    alt="Después del servicio"
                    className="h-48 w-full object-cover"
                  />
                  <div className="bg-success absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-medium text-white">
                    Después
                  </div>
                </div>
                <p className="text-text-secondary text-center text-sm">
                  Resultado profesional
                </p>
              </div>
            </div>

            {/* Service Guarantee */}
            <div className="border-success/20 rounded-xl border-2 bg-white p-6">
              <div className="mb-3 flex items-center space-x-3">
                <Icon name="Shield" size={24} className="text-success" />
                <h4 className="text-text-primary font-semibold">
                  Garantía de Satisfacción
                </h4>
              </div>
              <p className="text-text-secondary text-sm">
                Si no estás completamente satisfecho con nuestro trabajo, lo
                corregimos sin costo adicional. Tu tranquilidad es nuestra
                prioridad.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Service Banner */}
        <div className="bg-urgency mt-16 rounded-2xl p-8 text-center text-white">
          <div className="mb-4 flex items-center justify-center space-x-3">
            <Icon name="Zap" size={32} />
            <h3 className="text-2xl font-bold">Servicio de Emergencia 24/7</h3>
          </div>
          <p className="mb-6 text-lg opacity-90">
            ¿Avería urgente? No esperes. Nuestro equipo está disponible las 24
            horas.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              onClick={() => (window.location.href = "tel:+34900123456")}
              className="text-urgency border-white hover:scale-105 hover:bg-white hover:text-orange-500"
            >
              Llamar Emergencia: 900 123 456
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() =>
                window.open(
                  "https://wa.me/34900123456?text=Emergencia HVAC",
                  "_blank",
                )
              }
              className="text-urgency border-white hover:scale-105 hover:bg-white hover:text-orange-500"
            >
              WhatsApp Urgente
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
