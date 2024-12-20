import { Project } from "@types";
import React from "react";

const ProjectDescription = ({ project }: { project: Project }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-[#161B22] ring-1 ring-white/10">
      <div className="border-b border-white/10 md:p-6 p-3">
        <h2 className="md:text-xl text-lg font-semibold text-white">About</h2>
      </div>
      <div className="md:p-6 p-3">
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectDescription;
