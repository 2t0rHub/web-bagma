import React, { useState } from "react";
import { Button } from "@/components/ui/Button.tsx";
import Select from "@/components/ui/Select.tsx";
import Icon from "@/components/AppIcon.tsx";

const PricingSection = () => {
  const [calculatorData, setCalculatorData] = useState({
    propertySize: "",
    systemType: "",
    complexity: "",
    urgency: "normal",
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [activeTab, setActiveTab] = useState("calculator");

  const pricingPlans = [
    {
      name: "Básico",
      price: "899",
      description: "Perfecto para espacios pequeños",
      features: [
        "Instalación profesional",
        "Equipo estándar incluido",
        "Garantía 1 año",
        "Mantenimiento básico",
        "Soporte telefónico",
        "Certificado de instalación",
      ],
      recommended: false,
      color: "secondary",
    },
    {
      name: "Premium",
      price: "1,299",
      description: "La opción más popular",
      features: [
        "Instalación premium",
        "Equipo inverter A+++",
        "Garantía 2 años",
        "Mantenimiento anual incluido",
        "Soporte prioritario 24/7",
        "Certificado energético",
        "Financiación sin intereses",
        "Revisión gratuita",
      ],
      recommended: true,
      color: "primary",
    },
    {
      name: "Completo",
      price: "1,899",
      description: "Solución integral premium",
      features: [
        "Instalación completa premium",
        "Equipos de gama alta",
        "Garantía extendida 3 años",
        "Plan mantenimiento premium",
        "Soporte VIP 24/7",
        "Certificación completa",
        "Financiación flexible",
        "Monitoreo inteligente",
        "Reemplazo de emergencia",
        "Consultoría energética",
      ],
      recommended: false,
      color: "success",
    },
  ];

  const propertySizeOptions = [
    { value: "small", label: "Pequeño (hasta 50m²)" },
    { value: "medium", label: "Mediano (50-100m²)" },
    { value: "large", label: "Grande (100-150m²)" },
    { value: "xlarge", label: "Muy Grande (150m²+)" },
  ];

  const systemTypeOptions = [
    { value: "split", label: "Split Individual" },
    { value: "multi-split", label: "Multi-Split" },
    { value: "ducted", label: "Conductos" },
    { value: "water-heater", label: "Calentador de Agua" },
    { value: "combo", label: "Combinado AC + Calentador" },
  ];

  const complexityOptions = [
    { value: "simple", label: "Instalación Simple" },
    { value: "standard", label: "Instalación Estándar" },
    { value: "complex", label: "Instalación Compleja" },
  ];

  const urgencyOptions = [
    { value: "normal", label: "Instalación Normal (7-10 días)" },
    { value: "priority", label: "Instalación Prioritaria (3-5 días)" },
    { value: "emergency", label: "Instalación Urgente (24-48h)" },
  ];

  const calculatePrice = () => {
    console.log("Calculator data:", calculatorData);
    if (
      !calculatorData?.propertySize ||
      !calculatorData?.systemType ||
      !calculatorData?.complexity
    ) {
      console.log("Missing required fields");
      return;
    }

    let basePrice = 0;

    // Base price by system type
    switch (calculatorData?.systemType) {
      case "split":
        basePrice = 899;
        break;
      case "multi-split":
        basePrice = 1299;
        break;
      case "ducted":
        basePrice = 1899;
        break;
      case "water-heater":
        basePrice = 649;
        break;
      case "combo":
        basePrice = 1599;
        break;
      default:
        basePrice = 899;
    }

    // Property size multiplier
    switch (calculatorData?.propertySize) {
      case "small":
        basePrice *= 1;
        break;
      case "medium":
        basePrice *= 1.3;
        break;
      case "large":
        basePrice *= 1.6;
        break;
      case "xlarge":
        basePrice *= 2;
        break;
    }

    // Complexity multiplier
    switch (calculatorData?.complexity) {
      case "simple":
        basePrice *= 1;
        break;
      case "standard":
        basePrice *= 1.2;
        break;
      case "complex":
        basePrice *= 1.5;
        break;
    }

    // Urgency surcharge
    switch (calculatorData?.urgency) {
      case "priority":
        basePrice *= 1.15;
        break;
      case "emergency":
        basePrice *= 1.3;
        break;
    }

    console.log("Calculated price:", Math.round(basePrice));
    setEstimatedPrice(Math.round(basePrice));
  };

  const handleInputChange = (field: string, value: string) => {
    console.log("Input change:", field, value);
    setCalculatorData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuoteRequest = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="precios" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="Calculator" size={16} />
            <span className="text-sm font-medium">Precios Transparentes</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            Precios Claros, <span className="text-primary">Sin Sorpresas</span>
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Conoce exactamente cuánto costará tu instalación. Precios fijos,
            transparentes y sin costos ocultos.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12 flex justify-center">
          <div className="bg-muted rounded-xl p-2">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`transition-smooth rounded-lg px-6 py-3 ${
                activeTab === "calculator"
                  ? "shadow-card text-primary bg-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Calculadora de Precios
            </button>
            <button
              onClick={() => setActiveTab("plans")}
              className={`transition-smooth rounded-lg px-6 py-3 ${
                activeTab === "plans"
                  ? "shadow-card text-primary bg-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Planes de Servicio
            </button>
          </div>
        </div>

        {/* Price Calculator */}
        {activeTab === "calculator" && (
          <div className="from-primary/5 to-secondary/5 mb-12 rounded-2xl bg-gradient-to-br p-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h3 className="text-text-primary mb-4 text-2xl font-bold">
                  Calculadora de Presupuesto Instantáneo
                </h3>
                <p className="text-text-secondary">
                  Obtén una estimación precisa en segundos
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <Select
                    label="Tamaño de la propiedad"
                    options={propertySizeOptions}
                    value={calculatorData?.propertySize}
                    onChange={(value) =>
                      handleInputChange("propertySize", value)
                    }
                    placeholder="Selecciona el tamaño"
                  />

                  <Select
                    label="Tipo de sistema"
                    options={systemTypeOptions}
                    value={calculatorData?.systemType}
                    onChange={(value) => handleInputChange("systemType", value)}
                    placeholder="Selecciona el sistema"
                  />

                  <Select
                    label="Complejidad de instalación"
                    options={complexityOptions}
                    value={calculatorData?.complexity}
                    onChange={(value) => handleInputChange("complexity", value)}
                    placeholder="Selecciona la complejidad"
                  />

                  <Select
                    label="Urgencia del servicio"
                    options={urgencyOptions}
                    value={calculatorData?.urgency}
                    onChange={(value) => handleInputChange("urgency", value)}
                  />
                </div>

                <div className="shadow-card border-border rounded-xl border bg-white p-6">
                  <h4 className="text-text-primary mb-4 font-semibold">
                    Estimación de Precio
                  </h4>

                  {estimatedPrice ? (
                    <div className="text-center">
                      <div className="text-primary mb-2 text-4xl font-bold">
                        {estimatedPrice?.toLocaleString("es-ES")}€
                      </div>
                      <p className="text-text-secondary mb-6">
                        Precio estimado instalación completa
                      </p>

                      <div className="mb-6 space-y-3 text-left text-sm">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Check"
                            size={14}
                            className="text-success"
                          />
                          <span>Instalación profesional incluida</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Check"
                            size={14}
                            className="text-success"
                          />
                          <span>Garantía de 2 años</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Check"
                            size={14}
                            className="text-success"
                          />
                          <span>Mantenimiento primer año</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Check"
                            size={14}
                            className="text-success"
                          />
                          <span>Certificación energética</span>
                        </div>
                      </div>

                      <Button
                        variant="default"
                        fullWidth
                        iconName="Phone"
                        iconPosition="left"
                        onClick={handleQuoteRequest}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Solicitar Presupuesto Detallado
                      </Button>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Icon
                        name="Calculator"
                        size={48}
                        className="text-muted mx-auto mb-4"
                      />
                      <p className="text-text-secondary mb-4">
                        Completa los campos para ver tu estimación
                      </p>
                      <Button
                        variant="outline"
                        onClick={calculatePrice}
                        disabled={
                          !calculatorData?.propertySize ||
                          !calculatorData?.systemType ||
                          !calculatorData?.complexity
                        }
                      >
                        Calcular Precio
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        {activeTab === "plans" && (
          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans?.map((plan, index) => (
              <div
                key={index}
                className={`shadow-card relative rounded-2xl border-2 bg-white p-8 ${
                  plan?.recommended ? "border-primary" : "border-border"
                } hover:shadow-subtle transition-smooth`}
              >
                {plan?.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <div className="bg-primary rounded-full px-4 py-2 text-sm font-medium text-white">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className="text-text-primary mb-2 text-2xl font-bold">
                    {plan?.name}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {plan?.description}
                  </p>
                  <div className="text-text-primary mb-1 text-4xl font-bold">
                    {plan?.price}€
                  </div>
                  <p className="text-text-secondary text-sm">
                    Desde este precio
                  </p>
                </div>

                <div className="mb-8 space-y-3">
                  {plan?.features?.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div
                        className={`h-5 w-5 bg-${plan?.color}/10 flex items-center justify-center rounded-full`}
                      >
                        <Icon
                          name="Check"
                          size={12}
                          className={`text-${plan?.color}`}
                        />
                      </div>
                      <span className="text-text-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan?.recommended ? "default" : "outline"}
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleQuoteRequest}
                  className={
                    plan?.recommended
                      ? `bg-${plan?.color} hover:bg-${plan?.color}/90`
                      : ""
                  }
                >
                  Elegir {plan?.name}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Financing Options */}
        <div className="from-success/10 to-primary/10 mt-16 rounded-2xl bg-gradient-to-r p-8">
          <div className="mb-8 text-center">
            <Icon
              name="CreditCard"
              size={48}
              className="text-primary mx-auto mb-4"
            />
            <h3 className="text-text-primary mb-4 text-2xl font-bold">
              Opciones de Financiación Flexibles
            </h3>
            <p className="text-text-secondary mx-auto max-w-2xl">
              No dejes que el presupuesto sea un obstáculo. Ofrecemos múltiples
              opciones de pago para que puedas disfrutar de tu nuevo sistema
              HVAC desde el primer día.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="shadow-card border-border rounded-xl border bg-white p-6 text-center">
              <Icon
                name="Zap"
                size={32}
                className="text-warning mx-auto mb-4"
              />
              <h4 className="text-text-primary mb-2 font-semibold">
                Sin Intereses
              </h4>
              <p className="text-text-secondary text-sm">
                Hasta 12 meses sin intereses para instalaciones premium
              </p>
            </div>
            <div className="shadow-card border-border rounded-xl border bg-white p-6 text-center">
              <Icon
                name="Calendar"
                size={32}
                className="text-primary mx-auto mb-4"
              />
              <h4 className="text-text-primary mb-2 font-semibold">
                Pago Diferido
              </h4>
              <p className="text-text-secondary text-sm">
                Comienza a pagar después de 3 meses de la instalación
              </p>
            </div>
            <div className="shadow-card border-border rounded-xl border bg-white p-6 text-center">
              <Icon
                name="Percent"
                size={32}
                className="text-success mx-auto mb-4"
              />
              <h4 className="text-text-primary mb-2 font-semibold">
                Descuentos
              </h4>
              <p className="text-text-secondary text-sm">
                Hasta 15% de descuento por pago al contado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
