// components/filter-icon.tsx
import React from "react";

type FilterIconProps = {
  name: string;
  className?: string;
};

export const FilterIcon: React.FC<FilterIconProps> = ({
  name,
  className = "",
}) => {
  return (
    <div>
      <span
        aria-hidden
        className={`
        material-symbols-outlined
        text-[10px]
        font-light
        leading-none
        translate-y-px
        ${className}
      `}
        style={{
          fontVariationSettings: `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 10`,
          fontSize: "20px",
        }}
      >
        {name}
      </span>
    </div>
  );
};
