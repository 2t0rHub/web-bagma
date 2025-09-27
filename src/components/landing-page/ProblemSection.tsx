import React, { useState } from "react";
import Icon from "@/components/AppIcon.tsx";
import Image from "@/components/AppImage.tsx";

const ProblemSection = () => {
  const [selectedProblem, setSelectedProblem] = useState(0);

  const problems = [
    {
      id: 0,
      title: "Aire Acondicionado Averiado",
      description:
        "Tu sistema de AC no enfría adecuadamente, hace ruidos extraños o consume demasiada energía. Los veranos españoles son implacables.",
      image:
        "https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg?auto=compress&cs=tinysrgb&w=800",
      impact: "Facturas eléctricas hasta 40% más altas",
      urgency: "Alta",
      icon: "Wind",
    },
    {
      id: 1,
      title: "Calentador de Agua Ineficiente",
      description:
        "Agua tibia, tiempo de espera excesivo, o facturas de gas disparadas. Tu familia merece agua caliente confiable.",
      image:
        "https://images.pexels.com/photos/8005032/pexels-photo-8005032.jpeg?auto=compress&cs=tinysrgb&w=800",
      impact: "Desperdicio de hasta 200€ anuales",
      urgency: "Media",
      icon: "Droplets",
    },
    {
      id: 2,
      title: "Emergencias HVAC",
      description:
        "Averías nocturnas, fines de semana o días festivos. Los problemas HVAC no esperan horarios convenientes.",
      image:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800",
      impact: "Estrés y incomodidad familiar",
      urgency: "Crítica",
      icon: "AlertTriangle",
    },
  ];

  const consequences = [
    {
      icon: "TrendingUp",
      title: "Facturas Elevadas",
      description:
        "Sistemas ineficientes pueden aumentar tus costos energéticos hasta un 50%",
    },
    {
      icon: "Thermometer",
      title: "Incomodidad Constante",
      description:
        "Temperaturas inadecuadas afectan tu productividad y bienestar familiar",
    },
    {
      icon: "Clock",
      title: "Tiempo Perdido",
      description:
        "Esperas por técnicos no especializados que no resuelven el problema",
    },
    {
      icon: "AlertCircle",
      title: "Riesgos de Seguridad",
      description:
        "Instalaciones defectuosas pueden causar problemas eléctricos o de gas",
    },
  ];

  return (
    <section className="to-muted bg-gradient-to-b from-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-urgency/10 text-urgency mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Problemas Comunes HVAC</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            ¿Te Suena Familiar Alguna de Estas{" "}
            <span className="text-urgency">Situaciones</span>?
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Miles de familias españolas sufren estos problemas diariamente. No
            tienes que ser una más de ellas.
          </p>
        </div>

        {/* Problem Showcase */}
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Problem Selector */}
          <div className="space-y-4">
            {problems?.map((problem, index) => (
              <div
                key={problem?.id}
                onClick={() => setSelectedProblem(index)}
                className={`transition-smooth cursor-pointer rounded-xl border-2 p-6 ${
                  selectedProblem === index
                    ? "border-urgency bg-urgency/5"
                    : "border-border hover:border-urgency/50 bg-white"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      selectedProblem === index
                        ? "bg-urgency text-white"
                        : "bg-muted text-text-secondary"
                    }`}
                  >
                    <Icon name={problem?.icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-text-primary font-semibold">
                        {problem?.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          problem?.urgency === "Crítica"
                            ? "bg-urgency/20 text-urgency"
                            : problem?.urgency === "Alta"
                              ? "bg-warning/20 text-warning"
                              : "bg-secondary/20 text-secondary"
                        }`}
                      >
                        {problem?.urgency}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-3 text-sm">
                      {problem?.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="TrendingDown"
                        size={16}
                        className="text-urgency"
                      />
                      <span className="text-urgency text-sm font-medium">
                        {problem?.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Problem Visual */}
          <div className="relative">
            <div className="shadow-card relative overflow-hidden rounded-2xl">
              <Image
                src={problems?.[selectedProblem]?.image}
                alt={problems?.[selectedProblem]?.title}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute right-6 bottom-6 left-6 text-white">
                <h4 className="mb-2 text-xl font-semibold">
                  {problems?.[selectedProblem]?.title}
                </h4>
                <p className="text-sm opacity-90">
                  {problems?.[selectedProblem]?.description}
                </p>
              </div>
            </div>

            {/* Problem Indicator */}
            <div className="bg-urgency shadow-card absolute -top-4 -right-4 rounded-full p-3 text-white">
              <Icon name="X" size={20} />
            </div>
          </div>
        </div>

        {/* Consequences Grid */}
        <div className="shadow-card border-border rounded-2xl border bg-white p-8">
          <div className="mb-8 text-center">
            <h3 className="text-text-primary mb-4 text-2xl font-bold">
              Las Consecuencias de No Actuar
            </h3>
            <p className="text-text-secondary">
              Cada día que pasa sin solucionar estos problemas, los costos
              aumentan
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {consequences?.map((consequence, index) => (
              <div key={index} className="p-4 text-center">
                <div className="bg-urgency/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Icon
                    name={consequence?.icon}
                    size={24}
                    className="text-urgency"
                  />
                </div>
                <h4 className="text-text-primary mb-2 font-semibold">
                  {consequence?.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {consequence?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary mb-6 text-lg">
            <strong>¡No esperes más!</strong> Cada día sin solución es dinero
            perdido y comodidad sacrificada.
          </p>
          <div className="bg-success/10 text-success inline-flex items-center space-x-2 rounded-full px-6 py-3">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">
              Solución profesional disponible ahora
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
