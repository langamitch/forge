"use client";
import React from "react";
import Link from "next/link";

const CategoryFilter = () => {
  const filters = [
    "All",
    "Portfolio",
    "Tool",
    "Ai",
    "E-commerce",
    "Agency",
    "Non-profit",
    "Blog",
    "Personal",
  ];

  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [fixed, setFixed] = React.useState(false);

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // when sentinel is not intersecting, user scrolled past it -> make filter fixed
        setFixed(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      {/* sentinel used to detect when to pin the filter */}
      <div ref={sentinelRef} />

      <div
        className={`${
          fixed
            ? "fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-30"
            : "relative"
        } flex p-2 flex-nowrap overflow-auto gap-2 no-scrollbar`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl muted text-sm font-medium helvetica shrink-0"
          >
            {filter}
          </button>
        ))}

        <Link
          href="/submit"
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium helvetica shrink-0"
        >
          Submit Website
        </Link>
      </div>

      {/* spacer to prevent content jump when filter becomes fixed */}
      {fixed && <div className="h-14" aria-hidden="true" />}
    </div>
  );
};

export default CategoryFilter;
