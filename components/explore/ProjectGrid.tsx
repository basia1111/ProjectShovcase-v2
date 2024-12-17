"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Project } from "@types";
import ProjectCard from "../project/ProjectCard";
import Pagination from "./Pagination";

type ProjectGridProps = {
  projects: Project[];
  currentCategory: string | null;
  activePage: number;
  handlePageChange: (page: number) => void;
};

const ProjectGrid = ({ projects, currentCategory, activePage, handlePageChange }: ProjectGridProps) => {
  const itemsPerPage = 1;

  const resultsFrom = (activePage - 1) * itemsPerPage;
  const resultsTo = activePage * itemsPerPage;

  const filteredProjects = useMemo(() => {
    return currentCategory == null ? projects : projects.filter((project) => project.category === currentCategory);
  }, [projects, currentCategory]);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {filteredProjects.slice(resultsFrom, resultsTo).map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isOwner={false}
          />
        ))}
      </div>
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
