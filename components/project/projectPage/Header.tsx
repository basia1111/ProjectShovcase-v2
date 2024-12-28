/* eslint-disable @next/next/no-img-element */
import ModalButton from "@components/common/buttons/ModalButton";
import EditProjectForm from "@components/forms/EditProjectForm";
import { Project } from "@types";

import React from "react";
import { FiCalendar, FiEdit } from "react-icons/fi";

type HeaderProps = {
  mode: "private" | "public";
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};
const Header = ({ mode, project, setProject }: HeaderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-[#161B22] shadow-xl ring-1 ring-white/10">
      <div className="relative md:h-[400px] h-[300px]">
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/70 to-transparent" />

        {mode === "private" && (
          <div className="absolute md:right-6 md:top-6  right-3 top-3 flex gap-2">
            <ModalButton
              modalContent={
                <EditProjectForm
                  project={project}
                  setProject={setProject}
                />
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#161B22]/60 px-4 py-2  text-xs md:text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-[#1C2128]"
            >
              <FiEdit className="md:size-4 size-3" />
              Edit Project
            </ModalButton>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 md:p-8 p-4">
          <h1 className="md:mb-6 mb-2 md:text-4xl text-2xl font-bold text-white">{project.title}</h1>

          <a
            href={`/profile/${project.author._id}`}
            className="group flex items-center md:gap-3 gap-3 text-gray-300 hover:text-white"
          >
            <div className="relative md:h-12 md:w-12 h-8 w-8  overflow-hidden rounded-full ring-2 ring-teal-500/30 group-hover:ring-teal-500/50 transition-all">
              <img
                src={project.author.image || "/images/avatar.png"}
                alt={project.author.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="font-medium block md;text-base text-sm ">{project.author.name}</span>
              <span className="md:text-sm text-xs text-gray-400">
                <FiCalendar className="inline-block md:size-4 size-3 text-teal-500 mr-2" />
                {formatDate(project.createdAt)}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
