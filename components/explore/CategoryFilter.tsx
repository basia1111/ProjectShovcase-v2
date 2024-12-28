import React from "react";
import { PROJECT_CATEGORIES } from "@projectConstants";

type CategoryFilterProps = {
  handleCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
};
const CategoryFilter = ({ handleCategoryChange, currentCategory }: CategoryFilterProps) => {
  return (
    <div className="md:mb-12 mb-0 flex flex-wrap gap-2">
      <div
        onClick={() => handleCategoryChange(null)}
        key="all"
        className={` md:text-base text-xs md:px-4 md:py-2 py-0 px-1 transition-all duration-200 inline-flex  gap-2 font-medium  text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128] 
          ${
            currentCategory === null
              ? "rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
              : "rounded-lg"
          }
        `}
      >
        All
      </div>
      {PROJECT_CATEGORIES.map((category) => (
        <div
          onClick={() => handleCategoryChange(category.value)}
          key={category.label}
          className={` md:text-base text-xs md:px-4 md:py-2 py-0 px-1
            ${
              currentCategory === category.value
                ? "md:text-base text-xs md:px-4 md:py-2 py-0 px-1 transition-all duration-200 inline-flex  gap-2 font-medium  text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128]  rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600  hover:from-teal-500 hover:to-emerald-500"
                : "rounded-lg"
            }
          `}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
