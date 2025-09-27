import React, { useState, useEffect } from "react";
import Icon from "../AppIcon";
import { Button } from "./Button";

const EmergencyContactWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Show widget after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const handleEmergencyCall = (e: React.MouseEvent) => {
    e?.preventDefault();
    window.location.href = "tel:+34900123456";
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, necesito servicio de emergencia HVAC",
    );
    window.open(`https://wa.me/34900123456?text=${message}`, "_blank");
  };

  const isBusinessHours = () => {
    const hour = currentTime?.getHours();
    const day = currentTime?.getDay();
    // Monday to Friday 8AM to 8PM, Saturday 9AM to 6PM
    if (day >= 1 && day <= 5) {
      return hour >= 8 && hour < 20;
    } else if (day === 6) {
      return hour >= 9 && hour < 18;
    }
    return false;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Widget - Fixed Right Side */}
      <div className="fixed top-1/2 right-6 z-110 hidden -translate-y-1/2 transform lg:block">
        <div className="shadow-subtle border-border w-64 rounded-2xl border bg-white p-4">
          <div className="mb-4 text-center">
            <div className="bg-urgency mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
              <Icon name="Phone" size={24} color="white" />
            </div>
            <h3 className="text-text-primary font-semibold">Emergencia HVAC</h3>
            <p className="text-text-secondary text-sm">
              Servicio 24/7 disponible
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-muted flex items-center justify-between rounded-lg p-3">
              <div>
                <p className="text-text-primary text-sm font-medium">
                  Estado del servicio
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      isBusinessHours() ? "bg-success" : "bg-warning"
                    }`}
                  ></div>
                  <span className="text-text-secondary text-xs">
                    {isBusinessHours()
                      ? "Horario comercial"
                      : "Servicio de emergencia"}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              fullWidth={true}
              iconName="Phone"
              iconPosition="left"
              onClick={handleEmergencyCall}
              className="bg-urgency hover:bg-urgency/90 text-white"
            >
              Llamar: 900 123 456
            </Button>

            <Button
              variant="outline"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleWhatsApp}
              className="border-success text-success hover:bg-success hover:text-white"
            >
              WhatsApp
            </Button>
          </div>

          <div className="border-border mt-4 border-t pt-3">
            <p className="text-text-secondary text-center text-xs">
              Tiempo de respuesta promedio:{" "}
              <span className="font-medium">15 minutos</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Widget - Fixed Bottom */}
      <div className="fixed right-6 bottom-6 z-110 lg:hidden">
        <div className="relative">
          {/* Floating Action Button */}
          <Button
            variant="default"
            size="lg"
            iconName="Phone"
            onClick={handleEmergencyCall}
            className="bg-urgency hover:bg-urgency/90 shadow-subtle h-16 w-16 rounded-full text-white"
          />

          {/* Status Indicator */}
          <div
            className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
              isBusinessHours() ? "bg-success" : "bg-warning"
            }`}
          ></div>

          {/* Pulse Animation for Emergency */}
          {!isBusinessHours() && (
            <div className="bg-urgency absolute inset-0 animate-ping rounded-full opacity-20"></div>
          )}
        </div>

        {/* Quick Info Tooltip */}
        <div className="shadow-card border-border transition-smooth pointer-events-none absolute right-0 bottom-full mb-2 w-48 rounded-lg border bg-white p-3 opacity-0 hover:opacity-100">
          <p className="text-text-primary text-sm font-medium">
            Emergencia HVAC 24/7
          </p>
          <p className="text-text-secondary text-xs">900 123 456</p>
          <div className="mt-1 flex items-center space-x-1">
            <div
              className={`h-2 w-2 rounded-full ${
                isBusinessHours() ? "bg-success" : "bg-warning"
              }`}
            ></div>
            <span className="text-text-secondary text-xs">
              {isBusinessHours() ? "Horario comercial" : "Servicio nocturno"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyContactWidget;
