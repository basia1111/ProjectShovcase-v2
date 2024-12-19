"use client";

import React, { useEffect, useState } from "react";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";
import ProjectGrid from "./ProjectGrid";
import { Project } from "@types";
import { useRouter, useSearchParams } from "next/navigation";
import SelectFilter from "./SelectFilter";
import { URLSearchParams as URLParams } from "url";
import Card from "@components/common/Card";

const ExploreContent = ({ projects }: { projects: Project[] }) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [sorting, setSorting] = useState<null | "asc" | "desc">(null);
  const [queryString, setQueryString] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleQueryChange = (query: string) => {
    setQueryString(query);
    const newParams = new URLSearchParams();
    if (activePage) newParams.set("page", String(activePage));
    if (currentCategory) newParams.set("category", currentCategory);
    if (sorting) newParams.set("sort", String(sorting));
    if (query) newParams.set("query", String(query));
    updateURL(newParams);
  };

  const handleSortingChange = (sort: null | "asc" | "desc") => {
    setSorting(sort);
    const newParams = new URLSearchParams();
    if (activePage) newParams.set("page", String(activePage));
    if (currentCategory) newParams.set("category", currentCategory);
    if (sort) newParams.set("sort", String(sort));
    if (queryString) newParams.set("query", String(queryString));
    updateURL(newParams);
  };

  const handleCategoryChange = (category: string | null) => {
    setCurrentCategory(category);
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    if (category) newParams.set("category", category);
    if (sorting) newParams.set("sort", String(sorting));
    if (queryString) newParams.set("query", String(queryString));
    updateURL(newParams);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
    const newParams = new URLSearchParams();
    if (page) newParams.set("page", String(page));
    if (currentCategory) newParams.set("category", currentCategory);
    if (sorting) newParams.set("sort", String(sorting));
    if (queryString) newParams.set("query", String(queryString));
    updateURL(newParams);
  };

  const updateURL = (newParams: URLParams) => {
    const queryString = newParams.toString();
    const newPath = queryString ? `?${queryString}` : "";
    router.push(newPath, { scroll: false });
  };

  useEffect(() => {
    const page = searchParams.get("page");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const query = searchParams.get("query");
    if (page) setActivePage(Number(page));
    if (category) setCurrentCategory(category);
    if (sort) setSorting(sort as null | "asc" | "desc");
    if (query) setQueryString(query);
  }, [searchParams]);

  return (
    <>
      <div className="mb-8 space-y-4">
        <Search
          queryString={queryString}
          handleQueryChange={handleQueryChange}
          setQueryString={setQueryString}
        />
        <CategoryFilter
          handleCategoryChange={handleCategoryChange}
          currentCategory={currentCategory}
        />
      </div>
      <div className="py-4 flex justify-start">
        <SelectFilter
          handleSortingChange={handleSortingChange}
          sorting={sorting}
        />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <ProjectGrid
            projects={projects}
            currentCategory={currentCategory}
            activePage={activePage}
            handlePageChange={handlePageChange}
            sorting={sorting}
            query={queryString}
          />
        </div>

        <div className="lg:w-80">
          <Card className="sticky  top-24 rounded-2xl flex-col w-full px-4 md:px-6 py-6 items-start justify-start">
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
          </Card>
        </div>
      </div>
    </>
  );
};

export default ExploreContent;
