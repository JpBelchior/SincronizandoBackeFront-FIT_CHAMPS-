import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedOption(value || "");
  }, [value]);

  useEffect(() => {
    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    if (onChange) {
      // Simular um evento para manter a compatibilidade com o código existente
      onChange({ target: { value: option.value } });
    }
  };

  const displayValue = selectedOption
    ? options.find((opt) => opt.value === selectedOption)?.label ||
      selectedOption
    : placeholder || "Selecione uma opção";

  return (
    <div className="custom-dropdown relative w-full" ref={dropdownRef}>
      <div
        className="w-full p-2 bg-neutral-700 text-white rounded-md border border-neutral-600 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{displayValue}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute text-white z-10 w-full mt-1 bg-neutral-700 border border-neutral-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 hover:bg-neutral-600 cursor-pointer ${
                selectedOption === option.value ? "bg-sky-800" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
