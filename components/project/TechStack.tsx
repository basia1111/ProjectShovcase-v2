import { Project } from "@types";
import React from "react";

const TechStack = ({ project }: { project: Project }) => {
  return (
    <div className="relative flex flex-wrap gap-2 px-2 py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-emerald-500/5 to-teal-500/5 blur-xl" />
      {project.techStack.map((tech: string) => (
        <div
          key={tech}
          className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 px-4 py-2 backdrop-blur-sm ring-1 ring-white/10 transition-all hover:from-teal-500/20 hover:to-emerald-500/20"
        >
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400" />
          <span className="text-sm font-medium text-gray-300">{tech}</span>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
