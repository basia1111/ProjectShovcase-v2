"use client";

import React, { useEffect, useState } from "react";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";
import ProjectGrid from "./ProjectGrid";
import { Project } from "@types";
import { useRouter, useSearchParams } from "next/navigation";
import SelectFilter from "./SelectFilter";
import { URLSearchParams as URLParams } from "url";
import TopProjects from "./TopProjects";

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

        <TopProjects projects={projects} />
      </div>
    </>
  );
};

export default ExploreContent;
