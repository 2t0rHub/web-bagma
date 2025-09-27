// components/ui/Select.jsx - Shadcn style Select
import React, { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import Input from "./Input";

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface SelectProps {
  className?: string;
  options?: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  id?: string;
  name?: string;
  onChange?: (value: string | string[]) => void;
  onOpenChange?: (open: boolean) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      options = [],
      value,
      defaultValue,
      placeholder = "Select an option",
      multiple = false,
      disabled = false,
      required = false,
      label,
      description,
      error,
      searchable = false,
      clearable = false,
      loading = false,
      id,
      name,
      onChange,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Generate unique ID if not provided
    const selectId =
      id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Filter options based on search
    const filteredOptions =
      searchable && searchTerm
        ? options?.filter(
            (option) =>
              option?.label
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              (option?.value &&
                option?.value
                  ?.toString()
                  ?.toLowerCase()
                  ?.includes(searchTerm?.toLowerCase())),
          )
        : options;

    // Get selected option(s) for display
    const getSelectedDisplay = () => {
      if (!value) return placeholder;

      if (multiple) {
        const selectedOptions = options?.filter((opt) =>
          value?.includes(opt?.value),
        );
        if (selectedOptions?.length === 0) return placeholder;
        if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
        return `${selectedOptions?.length} items selected`;
      }

      const selectedOption = options?.find((opt) => opt?.value === value);
      return selectedOption ? selectedOption?.label : placeholder;
    };

    const handleToggle = () => {
      if (!disabled) {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        onOpenChange?.(newIsOpen);
        if (!newIsOpen) {
          setSearchTerm("");
        }
      }
    };

    const handleOptionSelect = (option: SelectOption) => {
      if (multiple) {
        const newValue = value || [];
        const updatedValue =
          Array.isArray(newValue) && newValue?.includes(option?.value)
            ? newValue?.filter((v: string) => v !== option?.value)
            : [...(Array.isArray(newValue) ? newValue : []), option?.value];
        onChange?.(updatedValue);
      } else {
        onChange?.(option?.value);
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e?.stopPropagation();
      onChange?.(multiple ? [] : "");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e?.target?.value);
    };

    const isSelected = (optionValue: string) => {
      if (multiple) {
        return value?.includes(optionValue) || false;
      }
      return value === optionValue;
    };

    const hasValue = multiple
      ? Array.isArray(value) && value?.length > 0
      : value !== undefined && value !== "";

    return (
      <div className={cn("relative", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "mb-2 block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error ? "text-destructive" : "text-foreground",
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <button
            ref={ref}
            id={selectId}
            type="button"
            className={cn(
              "border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm text-black focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:ring-destructive",
              !hasValue && "text-muted-foreground",
            )}
            onClick={handleToggle}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            {...props}
          >
            <span className="truncate">{getSelectedDisplay()}</span>

            <div className="flex items-center gap-1">
              {loading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}

              {clearable && hasValue && !loading && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4"
                  onClick={handleClear}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}

              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </div>
          </button>

          {/* Hidden native select for form submission */}
          <select
            name={name}
            value={value || ""}
            onChange={() => {}} // Controlled by our custom logic
            className="sr-only"
            tabIndex={-1}
            multiple={multiple}
            required={required}
          >
            <option value="">Select...</option>
            {options?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>

          {/* Dropdown */}
          {isOpen && (
            <div className="border-border absolute z-50 mt-1 w-full rounded-md border bg-white text-black shadow-md">
              {searchable && (
                <div className="border-b p-2">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                    <Input
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-8"
                    />
                  </div>
                </div>
              )}

              <div className="max-h-60 overflow-auto py-1">
                {filteredOptions?.length === 0 ? (
                  <div className="text-muted-foreground px-3 py-2 text-sm">
                    {searchTerm ? "No options found" : "No options available"}
                  </div>
                ) : (
                  filteredOptions?.map((option: SelectOption) => (
                    <div
                      key={option?.value}
                      className={cn(
                        "hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none select-none",
                        isSelected(option?.value) &&
                          "bg-primary text-primary-foreground",
                        option?.disabled && "pointer-events-none opacity-50",
                      )}
                      onClick={() =>
                        !option?.disabled && handleOptionSelect(option)
                      }
                    >
                      <span className="flex-1">{option?.label}</span>
                      {multiple && isSelected(option?.value) && (
                        <Check className="h-4 w-4" />
                      )}
                      {option?.description && (
                        <span className="text-muted-foreground ml-2 text-xs">
                          {option?.description}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        {description && !error && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
        {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
