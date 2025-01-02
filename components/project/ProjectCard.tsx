import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";

import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@projectConstants";
import DeleteProject from "@components/forms/DeleteProject";
import ModalButton from "@components/common/buttons/ModalButton";
import { Project } from "@types";
import Like from "./Like";

type ProjectCardType = {
  project: Project;
  setProjectsList?: React.Dispatch<React.SetStateAction<Project[] | null>>;
  isOwner: boolean;
  setProjectsNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const ProjectCard = ({ project, setProjectsList, isOwner, setProjectsNumber }: ProjectCardType) => {
  const getStatusColor = (status: string) => {
    const statusObj = PROJECT_STATUSES.find((s) => s.value === status);
    return statusObj?.color;
  };

  return (
    <div className="group">
      <div className="relative rounded-xl bg-[#161B22] ring-1 ring-white/10 transition-all duration-300 s hover:ring-white/20">
        <div className="relative">
          <a
            href={`/project/${project._id}`}
            className="block"
          >
            <img
              src={project.cover}
              alt={project.title}
              className="h-64 w-full rounded-t-xl object-cover"
            />
          </a>
        </div>
        <div className="p-6">
          <div className="flex gap-3 mb-4">
            <div
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${getStatusColor(project.status)}15`,
                color: getStatusColor(project.status),
              }}
            >
              {PROJECT_STATUSES.find((s) => s.value === project.status)?.label}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#161B22] px-3 py-1 text-xs font-medium text-white/70 ring-1 ring-white/10">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: getStatusColor(project.status) }}
              />
              {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label}
            </div>
          </div>
          <a
            href={`/project/${project._id}`}
            className="block"
          >
            <h3 className="text-xl font-bold text-white group-hover:text-teal-400 line-clamp-1 transition-colors duration-300 mb-3">{project.title}</h3>
          </a>
          <p className="text-sm leading-relaxed text-white/60 line-clamp-2 mb-6">{project.description}</p>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <a
              href={`/profile/${project.author._id}`}
              className="flex items-center gap-3 group/author"
            >
              <img
                src={project.author.image || "/images/avatar.png"}
                alt={project.author.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/10 transition-all duration-300 group-hover/author:ring-teal-500/30"
              />
              <span className="text-sm font-medium text-white/80 group-hover/author:text-white">{project.author.name}</span>
            </a>

            <div className="flex items-center gap-1.5">
              {isOwner && setProjectsList && setProjectsNumber && (
                <ModalButton
                  modalContent={
                    <DeleteProject
                      setProjectsList={setProjectsList}
                      id={project._id}
                      setProjectsNumber={setProjectsNumber}
                    />
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-all duration-300 hover:bg-red-500/20"
                >
                  <IoTrashBinOutline
                    size="16"
                    className="text-white/40 group-hover:text-red-400"
                  />
                </ModalButton>
              )}
              <Like project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
