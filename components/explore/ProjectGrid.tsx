"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Project } from "@types";
import ProjectCard from "../project/ProjectCard";
import Pagination from "./Pagination";
import { CgSpinnerAlt } from "react-icons/cg";

type ProjectGridProps = {
  projects: Project[];
  currentCategory: string | null;
  activePage: number;
  handlePageChange: (page: number) => void;
  sorting: null | "asc" | "desc";
};

const ProjectGrid = ({ projects, currentCategory, activePage, handlePageChange, sorting }: ProjectGridProps) => {
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  const resultsFrom = (activePage - 1) * itemsPerPage;
  const resultsTo = activePage * itemsPerPage;

  const filteredProjects = useMemo(() => {
    const projectList = currentCategory == null ? projects : projects.filter((project) => project.category === currentCategory);
    if (sorting == "asc") {
      projectList.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }
    if (sorting == "desc") {
      projectList.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    }
    return projectList;
  }, [projects, currentCategory, sorting]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentCategory, sorting]);

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
        <div className="grid grid-cols-2 gap-4">
          {filteredProjects.slice(resultsFrom, resultsTo).map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isOwner={false}
            />
          ))}
        </div>
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
