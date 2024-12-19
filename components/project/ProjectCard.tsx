/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import Link from "next/link";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@projectConstants";
import DeleteProject from "@components/forms/DeleteProject";
import ModalButton from "@components/common/buttons/ModalButton";
import { Project } from "@types";

const DefaultProjectCover = () => (
  <div className="relative h-full w-full bg-[#161B22]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/30 to-emerald-500/30 blur-2xl" />
    </div>
  </div>
);

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
    <div className="group relative">
      <div className="relative overflow-hidden rounded-xl bg-[#161B22]/80 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:ring-white/20">
        <div className="relative h-48">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <DefaultProjectCover />
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <div
              className="rounded-lg bg-[#161B22]/90 px-3 py-1.5 text-xs font-medium ring-1 ring-white/10 backdrop-blur-sm"
              style={{ color: getStatusColor(project.status) }}
            >
              {PROJECT_STATUSES.find((s) => s.value === project.status)?.label}
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#161B22]/90 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-sm">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: getStatusColor(project.status) }}
              />
              <span className="text-xs font-medium text-white/70">{PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label}</span>
            </div>
          </div>
        </div>

        <div className="relative p-5">
          <div className="absolute inset-0 bg-gradient-to-b from-[#161B22]/50 to-[#1C2128]/50" />

          <div className="relative">
            <Link
              href={`/project/${project._id}`}
              className="group/btn flex gap-2 items-center mb-2"
            >
              <h3 className=" text-lg font-semibold text-white">{project.title}</h3>
              <FiArrowRight className="transition-transform text-white opacity-0 duration-200 group-hover/btn:translate-x-0.5  group-hover/btn:opacity-100" />
            </Link>

            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/60">{project.description}</p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <img
                  src={project.author.image || "/images/avatar.png"}
                  alt={project.author.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
                />
                <Link
                  href={`/profile/${project.author._id}`}
                  className="text-sm font-medium text-white/70 hover:text-white"
                >
                  {project.author.name}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {isOwner && setProjectsList && setProjectsNumber && (
                  <ModalButton
                    modalContent={
                      <DeleteProject
                        setProjectsList={setProjectsList}
                        id={project._id}
                        setProjectsNumber={setProjectsNumber}
                      />
                    }
                    className="group/btn flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20"
                  >
                    <IoTrashBinOutline
                      className="text-white/40 transition-colors group-hover/btn:text-red-400"
                      size="14"
                    />
                  </ModalButton>
                )}

                <Link
                  href={`/project/${project._id}`}
                  className="group/btn hidden mdflex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-all hover:from-teal-500 hover:to-emerald-500"
                >
                  View
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
