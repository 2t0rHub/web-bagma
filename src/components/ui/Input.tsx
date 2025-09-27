import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      description,
      error,
      required = false,
      id,
      ...props
    },
    ref,
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Base input classes
    const baseInputClasses =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Checkbox-specific styles
    if (type === "checkbox") {
      return (
        <input
          type="checkbox"
          className={cn(
            "border-input bg-background text-primary focus:ring-ring h-4 w-4 rounded border focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      );
    }

    // Radio button-specific styles
    if (type === "radio") {
      return (
        <input
          type="radio"
          className={cn(
            "border-input bg-background text-primary focus:ring-ring h-4 w-4 rounded-full border focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      );
    }

    // For regular inputs with wrapper structure
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error ? "text-destructive" : "text-foreground",
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          type={type}
          className={cn(
            baseInputClasses,
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          ref={ref}
          id={inputId}
          {...props}
        />

        {description && !error && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
