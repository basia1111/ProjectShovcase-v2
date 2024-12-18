import { Project } from "@types";
import React from "react";
import { FiGithub, FiMail } from "react-icons/fi";

const ProjectButtons = ({ project }: { project: Project }) => {
  return (
    <div className="rounded-xl bg-[#161B22] p-6 ring-1 ring-white/10">
      <div className="space-y-3">
        <a
          href={project.gitHub}
          className="inline-flex w-full  items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 group bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
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
