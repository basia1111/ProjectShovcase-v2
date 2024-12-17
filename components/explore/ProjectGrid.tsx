"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Project } from "@types";
import ProjectCard from "../project/ProjectCard";
import { useRouter, useSearchParams } from "next/navigation";

type ProjectGridProps = {
  projects: Project[];
  currentCategory: string | null;
};

const ProjectGrid = ({ projects, currentCategory }: ProjectGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [categoryFromUrl, setCategoryFromUrl] = useState<string | null>(null);

  // Initialize state from URL and props
  useEffect(() => {
    const page = searchParams.get("page");
    const category = searchParams.get("category");

    if (page) {
      setActivePage(Number(page));
    }

    // Update categoryFromUrl when either URL parameter or prop changes
    const newCategory = category || currentCategory;
    if (newCategory !== categoryFromUrl) {
      setCategoryFromUrl(newCategory);
    }
  }, [searchParams, currentCategory]);

  const filteredProjects = useMemo(() => {
    return categoryFromUrl == null
      ? projects
      : projects.filter((project) => project.category === categoryFromUrl);
  }, [projects, categoryFromUrl]);

  const itemsPerPage = 1;

  const calculateTotalPages = () => {
    return Math.ceil(filteredProjects.length / itemsPerPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = calculateTotalPages();
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const resultsFrom = (activePage - 1) * itemsPerPage;
  const resultsTo = activePage * itemsPerPage;

  // Update URL when state changes
  const updateURL = (page: number, category: string | null) => {
    const newParams = new URLSearchParams();
    if (page > 1) {
      newParams.set("page", String(page));
    }
    if (category) {
      newParams.set("category", category);
    }
    const queryString = newParams.toString();
    const newPath = queryString ? `?${queryString}` : "";
    router.push(newPath, { scroll: false });
  };

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setCategoryFromUrl(newCategory || null);
    setActivePage(1);
    updateURL(1, newCategory || null);
  };

  // Update URL when page changes
  useEffect(() => {
    updateURL(activePage, categoryFromUrl);
  }, [activePage]);

  return (
    <>
      <div>
        <select
          value={categoryFromUrl || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mb-4 rounded p-2"
        >
          <option value="">All Categories</option>
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProjects.slice(resultsFrom, resultsTo).map((project) => (
          <ProjectCard key={project.id} project={project} isOwner={false} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-8">
        {getPageNumbers().map((pageNum) => (
          <button
            onClick={() => setActivePage(pageNum)}
            key={pageNum}
            className={`rounded-md border px-2 py-1 transition-all hover:text-emerald-300 ${
              pageNum === activePage
                ? "border-white/10 text-emerald-300"
                : "text-gray-200 border-transparent"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProjectGrid;
