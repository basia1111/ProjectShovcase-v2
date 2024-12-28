import { Project } from "@types";
import React from "react";

const TechStack = ({ project }: { project: Project }) => {
  return (
    <div className="relative flex flex-wrap gap-2 px-2 py-3">
      {project.techStack.map((tech: string) => (
        <div
          key={tech}
          className="rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 px-3 py-1 text-sm text-teal-400 ring-1 ring-teal-500/20"
        >
          <span className="text-sm font-medium">{tech}</span>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
