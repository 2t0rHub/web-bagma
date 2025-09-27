import React, { useState, useEffect } from "react";
import Icon from "@/components/AppIcon";
import Image from "@/components/AppImage";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      location: "Madrid Centro",
      service: "Instalación Aire Acondicionado",
      rating: 5,
      date: "Septiembre 2024",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      beforeImage:
        "https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
      testimonial: `Excelente servicio de principio a fin. El equipo de Grupo Bagma llegó puntual, trabajó de manera muy profesional y dejó todo impecable.\n\nMi factura eléctrica se redujo un 35% desde la instalación. Totalmente recomendados.`,
      highlights: ["Puntualidad", "Profesionalismo", "35% ahorro energético"],
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      location: "Barcelona, Eixample",
      service: "Calentador de Agua",
      rating: 5,
      date: "Agosto 2024",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      beforeImage:
        "https://images.pexels.com/photos/8005032/pexels-photo-8005032.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=400",
      testimonial: `Tuve una emergencia con mi calentador un domingo por la noche. Llamé y en menos de 2 horas tenía un técnico en casa.\n\nInstalaron un nuevo calentador de alta eficiencia. El servicio post-venta también es excelente.`,
      highlights: ["Servicio 24/7", "Respuesta rápida", "Alta eficiencia"],
    },
    {
      id: 3,
      name: "Ana Martín",
      location: "Valencia, Ruzafa",
      service: "Mantenimiento HVAC",
      rating: 5,
      date: "Julio 2024",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      beforeImage:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=400",
      testimonial: `Contraté el plan de mantenimiento anual y ha sido la mejor decisión. Mi equipo funciona como nuevo después de 5 años.\n\nEl técnico es muy detallista y siempre me explica todo lo que hace. Precio muy justo para la calidad.`,
      highlights: ["Plan anual", "Técnico detallista", "Precio justo"],
    },
    {
      id: 4,
      name: "Roberto Fernández",
      location: "Sevilla, Triana",
      service: "Instalación Completa",
      rating: 5,
      date: "Junio 2024",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      beforeImage:
        "https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
      testimonial: `Instalaron aire acondicionado en toda mi casa y renovaron el sistema de agua caliente. Trabajo impecable en tiempo récord.\n\nLa diferencia en comodidad y ahorro energético es increíble. Definitivamente los volveré a contratar.`,
      highlights: ["Instalación completa", "Tiempo récord", "Gran ahorro"],
    },
  ];

  const stats = [
    { value: "2,847", label: "Clientes Satisfechos", icon: "Users" },
    { value: "4.9", label: "Calificación Promedio", icon: "Star" },
    { value: "98%", label: "Recomendación", icon: "ThumbsUp" },
    { value: "24h", label: "Tiempo Respuesta", icon: "Clock" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const handleTestimonialChange = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrevious = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials?.length) % testimonials?.length,
    );
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section
      id="testimonios"
      className="to-muted bg-gradient-to-b from-white py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-warning/10 text-warning mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="MessageSquare" size={16} />
            <span className="text-sm font-medium">Testimonios Reales</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            Lo Que Dicen Nuestros <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Miles de familias ya confían en nosotros. Lee sus experiencias
            reales y descubre por qué somos la mejor opción para tus necesidades
            HVAC.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="shadow-card border-border rounded-xl border bg-white p-6 text-center"
            >
              <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-text-primary mb-1 text-2xl font-bold">
                {stat?.value}
              </div>
              <div className="text-text-secondary text-sm">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="shadow-card border-border overflow-hidden rounded-2xl border bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Testimonial Content */}
            <div className="p-8 lg:p-12">
              <div className="mb-6 flex items-center space-x-4">
                <Image
                  src={currentData?.avatar}
                  alt={currentData?.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-text-primary text-xl font-semibold">
                    {currentData?.name}
                  </h3>
                  <p className="text-text-secondary">{currentData?.location}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(currentData?.rating)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className="text-warning fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-text-secondary text-sm">
                      • {currentData?.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-primary/10 text-primary mb-4 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm">
                  <Icon name="Wrench" size={14} />
                  <span>{currentData?.service}</span>
                </div>
                <blockquote className="text-text-primary text-lg leading-relaxed whitespace-pre-line">
                  "{currentData?.testimonial}"
                </blockquote>
              </div>

              <div className="space-y-2">
                <h4 className="text-text-primary font-semibold">
                  Aspectos destacados:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentData?.highlights?.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-success/10 text-success rounded-full px-3 py-1 text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Before/After Images */}
            <div className="bg-muted p-8 lg:p-12">
              <h4 className="text-text-primary mb-4 text-center font-semibold">
                Antes y Después
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={currentData?.beforeImage}
                      alt="Antes del servicio"
                      className="h-32 w-full object-cover"
                    />
                    <div className="bg-urgency absolute top-2 left-2 rounded-full px-2 py-1 text-xs text-white">
                      Antes
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={currentData?.afterImage}
                      alt="Después del servicio"
                      className="h-32 w-full object-cover"
                    />
                    <div className="bg-success absolute top-2 left-2 rounded-full px-2 py-1 text-xs text-white">
                      Después
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  className="shadow-card hover:bg-primary transition-smooth flex h-10 w-10 items-center justify-center rounded-full bg-white hover:text-white"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>

                <div className="flex space-x-2">
                  {testimonials?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleTestimonialChange(index)}
                      className={`transition-smooth h-3 w-3 rounded-full ${
                        index === currentTestimonial
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="shadow-card hover:bg-primary transition-smooth flex h-10 w-10 items-center justify-center rounded-full bg-white hover:text-white"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Preview */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials?.slice(0, 3)?.map((testimonial, index) => (
            <div
              key={testimonial?.id}
              onClick={() => handleTestimonialChange(index)}
              className={`shadow-card transition-smooth cursor-pointer rounded-xl border bg-white p-6 ${
                index === currentTestimonial
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="mb-4 flex items-center space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-text-primary font-semibold">
                    {testimonial?.name}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {testimonial?.location}
                  </p>
                </div>
              </div>
              <div className="mb-3 flex items-center space-x-1">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className="text-warning fill-current"
                  />
                ))}
              </div>
              <p className="text-text-secondary line-clamp-3 text-sm">
                {testimonial?.testimonial?.split("\n")?.[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
