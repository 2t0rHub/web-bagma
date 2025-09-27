import React from "react";
import Icon from "@/components/AppIcon";

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const services = [
    "Instalación Aire Acondicionado",
    "Calentadores de Agua",
    "Mantenimiento HVAC",
    "Reparaciones de Emergencia",
    "Consultoría Energética",
    "Sistemas Comerciales",
  ];

  const quickLinks = [
    { label: "Inicio", href: "#hero" },
    { label: "Servicios", href: "#servicios" },
    { label: "Precios", href: "#precios" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Contacto", href: "#contacto" },
  ];

  const certifications = [
    "Certificación RITE",
    "Instalador Autorizado",
    "ISO 9001:2015",
    "Registro Industrial",
    "Seguro Responsabilidad Civil",
    "Técnicos Certificados",
  ];

  const handleLinkClick = (href: string) => {
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
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:+34900123456";
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, necesito información sobre servicios HVAC",
    );
    window.open(`https://wa.me/34900123456?text=${message}`, "_blank");
  };

  return (
    <footer className="bg-text-primary text-white">
      {/* Emergency Banner */}
      <div className="bg-urgency py-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-20">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-3 flex items-center space-x-3 md:mb-0">
              <Icon name="Zap" size={24} />
              <div>
                <h3 className="font-semibold">Emergencia HVAC 24/7</h3>
                <p className="text-sm opacity-90">
                  Respuesta garantizada en menos de 2 horas
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEmergencyCall}
                className="text-urgency transition-smooth rounded-lg bg-white px-4 py-2 font-semibold hover:bg-gray-100"
              >
                900 123 456
              </button>
              <button
                onClick={handleWhatsApp}
                className="transition-smooth rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-20">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center space-x-3">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon name="Wrench" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Grupo Bagma & R</h3>
                  <p className="text-sm opacity-80">
                    Servicios HVAC Profesionales
                  </p>
                </div>
              </div>
              <p className="mb-6 leading-relaxed text-gray-300">
                Más de 15 años de experiencia en instalación y mantenimiento de
                sistemas de climatización y agua caliente. Tu comodidad es
                nuestra prioridad.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-sm">900 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-sm">info@grupobagma.es</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm">Madrid, Barcelona, Valencia</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-6 text-lg font-semibold">Nuestros Servicios</h4>
              <ul className="space-y-3">
                {services?.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick("#servicios")}
                      className="hover:text-primary transition-smooth text-sm text-gray-300"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-lg font-semibold">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                {quickLinks?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link?.href)}
                      className="hover:text-primary transition-smooth text-sm text-gray-300"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="mb-4 font-semibold">Síguenos</h5>
                <div className="flex space-x-3">
                  <button className="hover:bg-primary transition-smooth flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Icon name="Facebook" size={20} />
                  </button>
                  <button className="hover:bg-primary transition-smooth flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Icon name="Instagram" size={20} />
                  </button>
                  <button className="hover:bg-primary transition-smooth flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Icon name="Linkedin" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="mb-6 text-lg font-semibold">Certificaciones</h4>
              <ul className="space-y-3">
                {certifications?.map((cert, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Shield" size={14} className="text-success" />
                    <span className="text-sm text-gray-300">{cert}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Badges */}
              <div className="mt-8">
                <h5 className="mb-4 font-semibold">Garantías</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-warning" />
                    <span className="text-sm text-gray-300">
                      15+ años experiencia
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-success" />
                    <span className="text-sm text-gray-300">
                      2,847 clientes satisfechos
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} className="text-warning" />
                    <span className="text-sm text-gray-300">
                      4.9/5 valoración media
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-5 lg:px-20">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-sm text-gray-400 md:mb-0">
              © {currentYear} Grupo Bagma & R. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-primary transition-smooth">
                Política de Privacidad
              </button>
              <button className="hover:text-primary transition-smooth">
                Términos de Servicio
              </button>
              <button className="hover:text-primary transition-smooth">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
