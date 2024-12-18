import { Project } from "@types";
import React from "react";

const ProjectDescription = ({ project }: { project: Project }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-[#161B22] ring-1 ring-white/10">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">About</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectDescription;
