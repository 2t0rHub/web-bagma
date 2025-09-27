import React, { useState } from "react";
import Icon from "@/components/AppIcon";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "¿Cuánto tiempo toma una instalación de aire acondicionado?",
      answer: `Una instalación estándar de aire acondicionado split toma entre 4-6 horas. Para instalaciones más complejas como sistemas multi-split o por conductos, puede tomar 1-2 días.\n\nNuestro proceso incluye:\n• Evaluación técnica inicial\n• Preparación del espacio\n• Instalación del equipo interior y exterior\n• Conexiones eléctricas y de refrigerante\n• Pruebas de funcionamiento\n• Explicación del uso y mantenimiento`,
      category: "Instalación",
    },
    {
      question: "¿Qué garantía ofrecen en sus instalaciones?",
      answer: `Ofrecemos garantías completas para tu tranquilidad:\n\n• Garantía de instalación: 2 años\n• Garantía de equipos: Hasta 5 años (según fabricante)\n• Garantía de mano de obra: 2 años\n• Servicio técnico gratuito durante el primer año\n\nAdemás, todos nuestros técnicos están certificados y utilizamos solo repuestos originales. Si surge cualquier problema relacionado con nuestra instalación, lo solucionamos sin costo adicional.`,
      category: "Garantía",
    },
    {
      question: "¿Cuánto puedo ahorrar en mi factura eléctrica?",
      answer: `El ahorro depende de varios factores, pero nuestros clientes típicamente ahorran:\n\n• Sistemas inverter A+++: 25-35% de ahorro\n• Reemplazo de equipos antiguos: 40-50% de ahorro\n• Sistemas de alta eficiencia: Hasta 60% de ahorro\n\nFactores que influyen en el ahorro:\n• Eficiencia energética del equipo\n• Tamaño adecuado para el espacio\n• Calidad de la instalación\n• Uso responsable del sistema\n• Mantenimiento regular`,
      category: "Ahorro",
    },
    {
      question: "¿Ofrecen servicio de emergencia 24/7?",
      answer: `Sí, nuestro servicio de emergencia está disponible 24 horas, 7 días a la semana, 365 días al año.\n\n• Tiempo de respuesta: Menos de 2 horas\n• Diagnóstico gratuito en emergencias\n• Técnicos especializados disponibles\n• Repuestos en stock para reparaciones inmediatas\n• Tarifas transparentes, sin sorpresas\n\nLlama al 900 123 456 para emergencias. Nuestro equipo está preparado para resolver cualquier avería urgente de climatización o agua caliente.`,
      category: "Emergencia",
    },
    {
      question: "¿Qué marcas de equipos instalan?",
      answer: `Trabajamos exclusivamente con las mejores marcas del mercado:\n\n• Mitsubishi Electric - Tecnología japonesa premium\n• Daikin - Líder mundial en climatización\n• Bosch - Calidad alemana reconocida\n• LG - Innovación y eficiencia energética\n• Samsung - Tecnología avanzada\n• Panasonic - Confiabilidad probada\n\nTodas las marcas que instalamos ofrecen:\n• Certificación energética A+++\n• Tecnología inverter\n• Garantía oficial del fabricante\n• Servicio técnico autorizado`,
      category: "Equipos",
    },
    {
      question: "¿Ofrecen opciones de financiación?",
      answer: `Sí, tenemos múltiples opciones de financiación para facilitar tu inversión:\n\n• Sin intereses: Hasta 12 meses sin intereses\n• Pago diferido: Comienza a pagar después de 3 meses\n• Financiación extendida: Hasta 60 meses con intereses competitivos\n• Descuento por pago al contado: Hasta 15% de descuento\n\nRequisitos mínimos:\n• Ingresos demostrables\n• Residencia en España\n• Aprobación crediticia\n\nConsulta con nuestro equipo las mejores opciones para tu situación.`,
      category: "Financiación",
    },
    {
      question: "¿Incluyen el mantenimiento después de la instalación?",
      answer: `Sí, el mantenimiento es fundamental para el rendimiento óptimo:\n\n• Primer año incluido: Mantenimiento gratuito\n• Revisiones programadas: 2 veces al año\n• Limpieza profunda de equipos\n• Verificación de niveles de refrigerante\n• Optimización de rendimiento\n• Detección temprana de problemas\n\nPlanes de mantenimiento disponibles:\n• Plan Básico: 89€/año\n• Plan Premium: 149€/año\n• Plan Completo: 199€/año\n\nCada plan incluye prioridad en emergencias y descuentos en reparaciones.`,
      category: "Mantenimiento",
    },
    {
      question: "¿En qué zonas dan servicio?",
      answer: `Damos servicio en las principales ciudades y áreas metropolitanas de España:\n\n• Madrid y Comunidad de Madrid\n• Barcelona y área metropolitana\n• Valencia y provincia\n• Sevilla y área metropolitana\n• Bilbao y Vizcaya\n• Zaragoza y provincia\n\nCobertura completa en:\n• Instalaciones residenciales\n• Oficinas y comercios\n• Pequeñas industrias\n• Comunidades de propietarios\n\nConsulta disponibilidad en tu zona llamando al 900 123 456. Nuestros técnicos locales garantizan servicio rápido y personalizado.`,
      category: "Cobertura",
    },
  ];

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="to-muted bg-gradient-to-b from-white py-20">
      <div className="mx-auto max-w-4xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-secondary/10 text-secondary mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="HelpCircle" size={16} />
            <span className="text-sm font-medium">Preguntas Frecuentes</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            Resolvemos Todas Tus <span className="text-primary">Dudas</span>
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Las preguntas más comunes de nuestros clientes sobre instalaciones
            HVAC, garantías, precios y servicios. Si no encuentras tu respuesta,
            contáctanos directamente.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories?.map((category, index) => (
            <button
              key={index}
              className="shadow-card border-border hover:border-primary hover:text-primary transition-smooth rounded-full border bg-white px-4 py-2 text-sm font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className="shadow-card border-border overflow-hidden rounded-xl border bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="hover:bg-muted transition-smooth flex w-full items-center justify-between px-6 py-6 text-left"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-3">
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                      {faq?.category}
                    </span>
                  </div>
                  <h3 className="text-text-primary pr-4 text-lg font-semibold">
                    {faq?.question}
                  </h3>
                </div>
                <div
                  className={`bg-primary/10 transition-smooth flex h-8 w-8 items-center justify-center rounded-full ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                >
                  <Icon name="ChevronDown" size={20} className="text-primary" />
                </div>
              </button>

              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-border border-t pt-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                        {faq?.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="from-primary/10 to-secondary/10 mt-16 rounded-2xl bg-gradient-to-r p-8 text-center">
          <Icon
            name="MessageCircle"
            size={48}
            className="text-primary mx-auto mb-4"
          />
          <h3 className="text-text-primary mb-4 text-2xl font-bold">
            ¿Aún Tienes Preguntas?
          </h3>
          <p className="text-text-secondary mx-auto mb-6 max-w-2xl">
            Nuestro equipo de expertos está disponible para resolver cualquier
            duda específica sobre tu proyecto HVAC. No dudes en contactarnos.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => (window.location.href = "tel:+34900123456")}
              className="bg-primary hover:bg-primary/90 transition-smooth inline-flex items-center space-x-2 rounded-lg px-6 py-3 text-white"
            >
              <Icon name="Phone" size={20} />
              <span>Llamar: 900 123 456</span>
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/34900123456?text=Tengo una pregunta sobre servicios HVAC",
                  "_blank",
                )
              }
              className="bg-success hover:bg-success/90 transition-smooth inline-flex items-center space-x-2 rounded-lg px-6 py-3 text-white"
            >
              <Icon name="MessageCircle" size={20} />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
