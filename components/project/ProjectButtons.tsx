import { Project } from "@types";
import React from "react";
import { FiGithub, FiMail } from "react-icons/fi";

const ProjectButtons = ({ project }: { project: Project }) => {
  return (
    <div className="rounded-xl bg-[#161B22] p-6 ring-1 ring-white/10">
      <div className="space-y-3">
        <a
          href={project.gitHub}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
        >
          <FiGithub className="h-4 w-4" />
          Star on GitHub
        </a>
        <a
          href={`mailto:${project.email}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1C2128] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#242B35] ring-1 ring-white/10"
        >
          <FiMail className="h-4 w-4" />
          Contact Author
        </a>
      </div>
    </div>
  );
};

export default ProjectButtons;
