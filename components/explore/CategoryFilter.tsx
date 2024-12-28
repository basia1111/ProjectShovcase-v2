import React from "react";
import { PROJECT_CATEGORIES } from "@projectConstants";
import Card from "@components/common/Card";

type CategoryFilterProps = {
  handleCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
};
const CategoryFilter = ({ handleCategoryChange, currentCategory }: CategoryFilterProps) => {
  return (
    <div className="md:mb-12 mb-0 flex flex-wrap gap-2">
      <Card
        onClick={() => handleCategoryChange(null)}
        key="all"
        className={` md:text-base text-xs md:px-4 md:py-2 py-0 px-1
          ${
            currentCategory === null
              ? "rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
              : "rounded-lg"
          }
        `}
      >
        All
      </Card>
      {PROJECT_CATEGORIES.map((category) => (
        <Card
          onClick={() => handleCategoryChange(category.value)}
          key={category.label}
          className={` md:text-base text-xs md:px-4 md:py-2 py-0 px-1
            ${
              currentCategory === category.value
                ? "rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
                : "rounded-lg"
            }
          `}
        >
          {category.label}
        </Card>
      ))}
    </div>
  );
};

export default CategoryFilter;
