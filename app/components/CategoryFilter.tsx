"use client";

import React from "react";
import Link from "next/link";
import { filters } from "../data/filters";
import { FilterButton } from "./filter-button";

const CategoryFilter: React.FC = () => {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [fixed, setFixed] = React.useState(false);
  const [active, setActive] = React.useState("all");

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFixed(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Sentinel */}
      <div ref={sentinelRef}  />

      {/* Filter bar */}
      <div
        className={`
          ${
            fixed
              ? "fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm px-2"
              : "relative"
          }
          flex gap-2 p-2 overflow-x-auto no-scrollbar
        `}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            active={active === filter.id}
            onClick={() => setActive(filter.id)}
          />
        ))}

        <Link
          href="/submit"
          className="
            shrink-0
            px-4 py-2
            rounded-xl
            bg-black
            text-white
            text-sm
            font-medium
            helvetica
          "
        >
          Submit Website
        </Link>
      </div>

      {/* Spacer when fixed */}
      {fixed && <div className="h-14" aria-hidden />}
    </div>
  );
};

export default CategoryFilter;
