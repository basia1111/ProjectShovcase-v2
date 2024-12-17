import React from "react";
import { PROJECT_CATEGORIES } from "@projectConstants";

type CategoryFilterProps = {
  handleCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
};
const CategoryFilter = ({ handleCategoryChange, currentCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      <div
        onClick={() => handleCategoryChange(null)}
        key="all"
        className={`transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium  ${
          currentCategory === null
            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
            : "text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128]"
        }`}
      >
        All
      </div>
      {PROJECT_CATEGORIES.map((category) => (
        <div
          onClick={() => handleCategoryChange(category.value)}
          key={category.label}
          className={`transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium  ${
            currentCategory === category.value
              ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
              : "text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128]"
          }`}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
