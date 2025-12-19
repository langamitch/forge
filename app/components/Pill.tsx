"use client";

import React from "react";

interface PillProps {
  label: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const Pill: React.FC<PillProps> = ({
  label,
  icon,
  selected = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1.5
        rounded-md
        helvetica

        border
        text-sm 
        transition-all
        ${
          selected
            ? "bg-black text-white border-black"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
      `}
    >
      {icon && (
        <span
          className="material-symbols-outlined text-[16px] font-light"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
};

export default Pill;
