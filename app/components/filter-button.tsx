// components/filter-button.tsx
import React from "react";
import { FilterIcon } from "./filter-icon";

type FilterButtonProps = {
  label: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  icon,
  active = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        shrink-0
        flex flex-row items-center gap-2
        px-4 py-1
        rounded-full
        text-sm
        font-semibold
        helvetica
        transition-colors
        ${
          active
            ? "bg-[#222222] text-[#ebebeb]"
            : "bg-gray-100 text-[#777777] hover:bg-gray-200"
        }
      `}
    >
      {icon && <FilterIcon name={icon} />}
      <span className="text-semibold text-[14px]">{label}</span>
    </button>
  );
};
