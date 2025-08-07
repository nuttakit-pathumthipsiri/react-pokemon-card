import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; name: string }>;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.id === value);
  const displayText = selectedOption ? selectedOption.name : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 pr-10 rounded-lg focus:outline-none transition-all duration-200 bg-card text-white border border-gray-600 text-left ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-700"
        }`}
      >
        <span className="block truncate">{displayText}</span>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 right-0 mt-1 bg-card border border-gray-600 rounded-lg shadow-lg min-w-[200px] max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div key={option.id}>
              <button
                type="button"
                onClick={() => handleOptionClick(option.id)}
                className={`w-full px-6 py-3 text-right text-white hover:bg-gray-700 transition-colors duration-150 ${
                  index < options.length - 1 ? "border-b border-gray-600" : ""
                } ${option.id === value ? "bg-gray-700" : ""}`}
              >
                {option.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
