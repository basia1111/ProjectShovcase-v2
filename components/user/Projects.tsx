"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@types";
import { FiPackage, FiPlusCircle } from "react-icons/fi";
import ProjectCard from "@components/project/ProjectCard";
import ModalButton from "@components/common/buttons/ModalButton";
import CreateProjectForm from "@components/forms/CreateProjectForm";
import { BounceLoader } from "react-spinners";
import { User } from "next-auth";

export type ProjectsProps = {
  user: User;
  isOwner: boolean;
  setProjectsNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Projects = ({ user, isOwner, setProjectsNumber }: ProjectsProps) => {
  const [projectsList, setProjectsList] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateProjects = (newProject: Project) => {
    setProjectsList((prev) => (prev ? [...prev, newProject] : [newProject]));
    setProjectsNumber(projectsList?.length ? projectsList?.length + 1 : 1);
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/project/user/${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setProjectsList(data.projects || []);
        setProjectsNumber(data.projects.length);
      } else {
        setProjectsNumber(0);
        setProjectsList(null);
      }
    } catch {
      console.error("error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="mt-12 w-full">
      <div className="flex items-center justify-between pb-6">
        <h3 className="mb-6 text-xl font-semibold text-white">Projects</h3>
        {isOwner && (
          <ModalButton
            modalContent={<CreateProjectForm updateProjects={updateProjects} />}
            className="group rounded-lg px-4 py-2"
          >
            <FiPlusCircle className="group-hover:scale-105" />
            create project
          </ModalButton>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-[#161B22]/10 p-10">
        {projectsList && projectsList.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {projectsList.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                setProjectsList={setProjectsList}
                isOwner={isOwner}
                setProjectsNumber={setProjectsNumber}
              />
            ))}
          </div>
        ) : !isLoading ? (
          <>
            <span className="mb-4 h-16 w-16 rounded-full bg-teal-400/10 p-4">
              <FiPackage
                size={32}
                className="text-teal-400"
              />
            </span>
            {isOwner ? (
              <>
                <h2 className="mb-2 text-xl font-light text-white">No Projects Yet</h2>
                <p className="text-md text-gray-400 max-w-md text-center font-light">
                  Start showcasing your work by adding your first project. Click the &quot;New Project&quot; button to begin!
                </p>
              </>
            ) : (
              <>
                {" "}
                <h2 className="mb-2 text-xl font-light text-white">No Projects Yet</h2>{" "}
                <p className="text-md text-gray-400 max-w-md text-center font-light"> This user hasn&apos;t added any projects yet. </p>
              </>
            )}
          </>
        ) : (
          <BounceLoader color="#2dd4be" />
        )}
      </div>
    </div>
  );
};

export default Projects;
