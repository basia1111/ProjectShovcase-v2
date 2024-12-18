import React from "react";
import { PROJECT_CATEGORIES } from "@projectConstants";
import Card from "@components/common/Card";

type CategoryFilterProps = {
  handleCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
};
const CategoryFilter = ({ handleCategoryChange, currentCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      <Card
        onClick={() => handleCategoryChange(null)}
        key="all"
        className={
          currentCategory === null
            ? " rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
            : "rounded-lg"
        }
      >
        All
      </Card>
      {PROJECT_CATEGORIES.map((category) => (
        <Card
          onClick={() => handleCategoryChange(category.value)}
          key={category.label}
          className={
            currentCategory === category.value
              ? "rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
              : "rounded-lg"
          }
        >
          {category.label}
        </Card>
      ))}
    </div>
  );
};

export default CategoryFilter;
