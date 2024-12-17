import Button from "@components/common/buttons/Button";
import React from "react";
import { PROJECT_CATEGORIES } from "@projectConstants";

type CategoryFilterProps = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string | null>>;
  currentCategory: string | null;
};
const CategoryFilter = ({
  setCurrentCategory,
  currentCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      <Button
        onClick={() => setCurrentCategory(null)}
        key="all"
        className={`transition-all duration-200 ${
          currentCategory === null
            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
            : "text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128]"
        }`}
      >
        All
      </Button>
      {PROJECT_CATEGORIES.map((category) => (
        <Button
          onClick={() => setCurrentCategory(category.value)}
          key={category.label}
          className={`transition-all duration-200 ${
            currentCategory === category.value
              ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
              : "text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128]"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
