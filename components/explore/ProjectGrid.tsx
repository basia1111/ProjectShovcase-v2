"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Project } from "@types";
import ProjectCard from "../project/ProjectCard";
import Pagination from "./Pagination";
import { CgSpinnerAlt } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";

type ProjectGridProps = {
  projects: Project[];
  currentCategory: string | null;
  activePage: number;
  handlePageChange: (page: number) => void;
  sorting: null | "asc" | "desc";
  query: string | undefined;
};

const ProjectGrid = ({ projects, currentCategory, activePage, handlePageChange, sorting, query }: ProjectGridProps) => {
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  const resultsFrom = (activePage - 1) * itemsPerPage;
  const resultsTo = activePage * itemsPerPage;

  const filteredProjects = useMemo(() => {
    let projectList = currentCategory == null ? projects : projects.filter((project) => project.category === currentCategory);

    if (query) {
      const searchTerm = query.toLowerCase().trim();
      if (searchTerm !== "") {
        projectList = projectList.filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.author.name.toLowerCase().includes(searchTerm)
        );
      }
    }
    if (sorting === "asc") {
      projectList = [...projectList].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    if (sorting === "desc") {
      projectList = [...projectList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return projectList;
  }, [projects, currentCategory, sorting, query]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentCategory, sorting, query, activePage]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <CgSpinnerAlt
            color="#ffffff"
            className="animate-spin text-4xl"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {filteredProjects.slice(resultsFrom, resultsTo).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isOwner={false}
              />
            ))}
          </div>
          {filteredProjects.length == 0 && (
            <div className="flex w-full flex-col items-center justify-center p-8 text-center rounded-lg bg-[#161B22] min-h-[300px]">
              <div className="mb-4">
                <FiSearch className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 max-w-md">No projects match your search criteria. Try adjusting your filters or search terms.</p>
            </div>
          )}
        </>
      )}
      <Pagination
        handlePageChange={handlePageChange}
        activePage={activePage}
        itemsPerPage={itemsPerPage}
        filteredProjects={filteredProjects}
      />
    </>
  );
};

export default ProjectGrid;
