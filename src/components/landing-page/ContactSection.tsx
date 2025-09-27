import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import Select from "@/components/ui/Select";
import Icon from "@/components/AppIcon";
import Input from "@/components/ui/Input";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  urgency: string;
  message: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    propertyType: "",
    urgency: "normal",
    message: "",
    acceptTerms: false,
    acceptMarketing: false,
  });
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const serviceOptions = [
    { value: "ac-installation", label: "Instalación Aire Acondicionado" },
    { value: "water-heater", label: "Calentador de Agua" },
    { value: "maintenance", label: "Mantenimiento HVAC" },
    { value: "repair", label: "Reparación de Emergencia" },
    { value: "consultation", label: "Consultoría Energética" },
  ];

  const propertyTypeOptions = [
    { value: "apartment", label: "Apartamento" },
    { value: "house", label: "Casa Unifamiliar" },
    { value: "office", label: "Oficina" },
    { value: "commercial", label: "Local Comercial" },
    { value: "other", label: "Otro" },
  ];

  const urgencyOptions = [
    { value: "normal", label: "Normal (7-10 días)" },
    { value: "priority", label: "Prioritario (3-5 días)" },
    { value: "emergency", label: "Emergencia (24-48h)" },
  ];

  const contactMethods = [
    {
      icon: "Phone",
      title: "Llamada Directa",
      description: "Habla directamente con nuestros expertos",
      action: "Llamar Ahora",
      value: "900 123 456",
      color: "urgency",
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp",
      description: "Respuesta rápida por WhatsApp",
      action: "Enviar Mensaje",
      value: "WhatsApp",
      color: "success",
    },
    {
      icon: "Mail",
      title: "Email",
      description: "Respuesta en menos de 2 horas",
      action: "Enviar Email",
      value: "info@grupobagma.es",
      color: "primary",
    },
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData?.name?.trim()) newErrors.name = "El nombre es requerido";
    if (!formData?.email?.trim()) newErrors.email = "El email es requerido";
    if (!formData?.phone?.trim()) newErrors.phone = "El teléfono es requerido";
    if (!formData?.service) newErrors.service = "Selecciona un servicio";
    if (!formData?.acceptTerms)
      newErrors.acceptTerms = "Debes aceptar los términos";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.email && !emailRegex?.test(formData?.email)) {
      newErrors.email = "Email inválido";
    }

    // Phone validation
    const phoneRegex = /^[0-9+\s-()]{9,}$/;
    if (formData?.phone && !phoneRegex?.test(formData?.phone)) {
      newErrors.phone = "Teléfono inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[] | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleNextStep = () => {
    if (formStep === 1) {
      if (formData?.name && formData?.email && formData?.phone) {
        setFormStep(2);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          propertyType: "",
          urgency: "normal",
          message: "",
          acceptTerms: false,
          acceptMarketing: false,
        });
        setFormStep(1);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:+34900123456";
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, necesito información sobre ${formData?.service || "servicios HVAC"}`,
    );
    window.open(`https://wa.me/34900123456?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:info@grupobagma.es?subject=Consulta HVAC";
  };

  if (submitSuccess) {
    return (
      <section
        id="contacto"
        className="from-muted bg-gradient-to-b to-white py-20"
      >
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-20">
          <div className="shadow-card border-border rounded-2xl border bg-white p-12">
            <div className="bg-success/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
            <h3 className="text-text-primary mb-4 text-3xl font-bold">
              ¡Solicitud Enviada Correctamente!
            </h3>
            <p className="text-text-secondary mb-6 text-lg">
              Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto
              contigo en las próximas 2 horas para programar tu consulta
              gratuita.
            </p>
            <div className="bg-primary/10 mb-6 rounded-xl p-6">
              <h4 className="text-text-primary mb-2 font-semibold">
                Próximos Pasos:
              </h4>
              <div className="text-text-secondary space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>Te llamaremos en las próximas 2 horas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span>Programaremos una visita técnica gratuita</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-primary" />
                  <span>Recibirás un presupuesto detallado</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              iconName="Phone"
              iconPosition="left"
              onClick={handleEmergencyCall}
              className="border-urgency text-urgency hover:bg-urgency hover:text-white"
            >
              ¿Urgente? Llama: 900 123 456
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contacto"
      className="from-muted bg-gradient-to-b to-white py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center space-x-2 rounded-full px-4 py-2">
            <Icon name="MessageSquare" size={16} />
            <span className="text-sm font-medium">Contacto Directo</span>
          </div>
          <h2 className="text-text-primary mb-6 text-3xl font-bold lg:text-5xl">
            Solicita Tu{" "}
            <span className="text-primary">Presupuesto Gratuito</span>
          </h2>
          <p className="text-text-secondary mx-auto max-w-3xl text-xl">
            Nuestros expertos están listos para ayudarte. Elige la forma de
            contacto que prefieras y obtén tu presupuesto personalizado sin
            compromiso.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h3 className="text-text-primary mb-6 text-2xl font-bold">
                Contacta Directamente
              </h3>
              <div className="space-y-4">
                {contactMethods?.map((method, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (method?.icon === "Phone") handleEmergencyCall();
                      else if (method?.icon === "MessageCircle")
                        handleWhatsApp();
                      else if (method?.icon === "Mail") handleEmail();
                    }}
                    className="shadow-card border-border hover:shadow-subtle transition-smooth group cursor-pointer rounded-xl border bg-white p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-14 w-14 bg-${method?.color}/10 flex items-center justify-center rounded-xl group-hover:bg-${method?.color} transition-smooth group-hover:text-white`}
                      >
                        <Icon
                          name={method?.icon}
                          size={24}
                          className={`text-${method?.color} group-hover:text-white`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-text-primary mb-1 font-semibold">
                          {method?.title}
                        </h4>
                        <p className="text-text-secondary mb-2 text-sm">
                          {method?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-${method?.color} font-medium`}>
                            {method?.value}
                          </span>
                          <span className="text-text-secondary group-hover:text-primary transition-smooth text-sm">
                            {method?.action} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Banner */}
            <div className="bg-urgency rounded-xl p-6 text-white">
              <div className="mb-4 flex items-center space-x-3">
                <Icon name="Zap" size={24} />
                <h4 className="font-semibold">¿Emergencia HVAC?</h4>
              </div>
              <p className="mb-4 text-sm opacity-90">
                Servicio de emergencia 24/7 disponible. Respuesta garantizada en
                menos de 2 horas.
              </p>
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                onClick={handleEmergencyCall}
                className="hover:text-urgency border-white text-white hover:bg-white"
              >
                Llamar Emergencia: 900 123 456
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="shadow-card border-border rounded-2xl border bg-white p-8">
            <div className="mb-6">
              <h3 className="text-text-primary mb-2 text-2xl font-bold">
                Formulario de Contacto
              </h3>
              <p className="text-text-secondary">
                Completa el formulario y te contactaremos en menos de 2 horas
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    formStep >= 1
                      ? "bg-primary text-white"
                      : "bg-muted text-text-secondary"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-12 rounded-full ${
                    formStep >= 2 ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    formStep >= 2
                      ? "bg-primary text-white"
                      : "bg-muted text-text-secondary"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formStep === 1 && (
                <>
                  <Input
                    label="Nombre completo"
                    type="text"
                    value={formData?.name}
                    onChange={(e) =>
                      handleInputChange("name", e?.target?.value)
                    }
                    error={errors?.name as string}
                    placeholder="Tu nombre completo"
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={formData?.email}
                    onChange={(e) =>
                      handleInputChange("email", e?.target?.value)
                    }
                    error={errors?.email as string}
                    placeholder="tu@email.com"
                    required
                  />

                  <Input
                    label="Teléfono"
                    type="tel"
                    value={formData?.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e?.target?.value)
                    }
                    error={errors?.phone as string}
                    placeholder="+34 600 000 000"
                    required
                  />

                  <Button
                    type="button"
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={handleNextStep}
                    disabled={
                      !formData?.name || !formData?.email || !formData?.phone
                    }
                    className="bg-primary hover:bg-primary/90"
                  >
                    Continuar
                  </Button>
                </>
              )}

              {formStep === 2 && (
                <>
                  <Select
                    label="Servicio requerido"
                    options={serviceOptions}
                    value={formData?.service}
                    onChange={(value) => handleInputChange("service", value)}
                    error={errors?.service as string}
                    placeholder="Selecciona un servicio"
                    required
                  />

                  <Select
                    label="Tipo de propiedad"
                    options={propertyTypeOptions}
                    value={formData?.propertyType}
                    onChange={(value) =>
                      handleInputChange("propertyType", value)
                    }
                    placeholder="Selecciona el tipo"
                  />

                  <Select
                    label="Urgencia del servicio"
                    options={urgencyOptions}
                    value={formData?.urgency}
                    onChange={(value) => handleInputChange("urgency", value)}
                  />

                  <div>
                    <label className="text-text-primary mb-2 block text-sm font-medium">
                      Mensaje adicional (opcional)
                    </label>
                    <textarea
                      value={formData?.message}
                      onChange={(e) =>
                        handleInputChange("message", e?.target?.value)
                      }
                      placeholder="Describe tu situación o necesidades específicas..."
                      rows={4}
                      className="border-border focus:ring-primary w-full resize-none rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <Checkbox
                      label="Acepto los términos y condiciones y la política de privacidad"
                      checked={formData?.acceptTerms}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("acceptTerms", e?.target?.checked)
                      }
                      error={errors?.acceptTerms as any}
                      required
                    />

                    <Checkbox
                      label="Acepto recibir comunicaciones comerciales sobre ofertas y promociones"
                      checked={formData?.acceptMarketing}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("acceptMarketing", e?.target?.checked)
                      }
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormStep(1)}
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      fullWidth
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="right"
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            {/* Trust Indicators */}
            <div className="border-border mt-8 border-t pt-6">
              <div className="text-text-secondary flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Datos protegidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>Respuesta en 2h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span>Sin compromiso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
