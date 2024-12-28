import { ModalContext } from "@contexts/ModalContext";
import { Project } from "@types";
import React, { useContext } from "react";

type StatNumberProps = {
  icon: any;
  label: string;
  value: number;
  list: Project[];
};

const ModalList = ({ list }: { list: Project[] }) => {
  return (
    <div className="w-full">
      <h3 className="text-base font-semibold pb-6">Supported Projects</h3>
      <div className="grid grid-cols-3 gap-px">
        {list.map((project, index) => (
          <div
            key={index}
            className="relative group bg-white aspect-square"
          >
            <a
              href={`/project/${project._id}`}
              className="block w-full h-full"
            >
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-white font-medium truncate px-2">{project.title}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatNumberProjects = ({ icon: Icon, label, value, list }: StatNumberProps) => {
  const { openModal } = useContext(ModalContext)!;

  return (
    <div
      className="flex items-center gap-2 "
      onClick={() => openModal(<ModalList list={list} />)}
    >
      <div className="min-w-[20px]">
        <Icon className="text-white/60  size-4" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-white/90 font-medium">{value}</span>
        <span className="text-white/60 text-sm">{label}</span>
      </div>
    </div>
  );
};

export default StatNumberProjects;
