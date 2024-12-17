"use client";

import React, { useEffect, useState } from "react";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";
import ProjectGrid from "./ProjectGrid";
import { Project } from "@types";
import { useRouter, useSearchParams } from "next/navigation";

const ExploreContent = ({ projects }: { projects: Project[] }) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string | null) => {
    setCurrentCategory(category);
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    if (category) newParams.set("category", category);
    updateURL(newParams);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
    const newParams = new URLSearchParams();
    if (page) newParams.set("page", String(page));
    if (currentCategory) newParams.set("category", currentCategory);
    updateURL(newParams);
  };

  const updateURL = (newParams: {}) => {
    const queryString = newParams.toString();
    const newPath = queryString ? `?${queryString}` : "";
    router.push(newPath, { scroll: false });
  };

  useEffect(() => {
    const page = searchParams.get("page");
    const category = searchParams.get("category");

    if (page) setActivePage(Number(page));
    if (category) setCurrentCategory(category);
  }, []);

  return (
    <>
      <div className="mb-8 space-y-4">
        <Search />
        <CategoryFilter
          handleCategoryChange={handleCategoryChange}
          currentCategory={currentCategory}
        />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <ProjectGrid
            projects={projects}
            currentCategory={currentCategory}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
        </div>

        <div className="lg:w-80">
          <div className="sticky top-24 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm">
            <h2 className="mb-6 text-lg font-semibold text-white">Trending Projects</h2>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-lg p-2 hover:bg-white/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500/10 font-semibold text-emerald-400">{index}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white hover:text-emerald-400">Project Name</h3>
                    <p className="text-gray-400 text-sm">1.2k stars this week</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreContent;
