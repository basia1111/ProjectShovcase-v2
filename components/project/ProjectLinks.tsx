import { Project } from "@types";
import React from "react";
import { FiBook, FiExternalLink, FiGithub, FiLink } from "react-icons/fi";

const ProjectLinks = ({ project }: { project: Project }) => {
  return (
    <div className="rounded-xl bg-[#161B22] p-6 ring-1 ring-white/10">
      <h2 className="mb-4 text-lg font-semibold text-white">Project Links</h2>
      <div className="space-y-3 text-sm">
        {project.gitHub && (
          <a
            href={project.gitHub}
            className="flex items-center gap-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FiGithub className="h-4 w-4 text-teal-500" />
            <span>GitHub Repository</span>
            <FiExternalLink className="h-4 w-4 ml-auto" />
          </a>
        )}
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            className="flex items-center gap-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FiLink className="h-4 w-4 text-teal-500" />
            <span>Live Demo</span>
            <FiExternalLink className="h-4 w-4 ml-auto" />
          </a>
        )}
        {project.documentation && (
          <a
            href={project.documentation}
            className="flex items-center gap-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FiBook className="h-4 w-4 text-teal-500" />
            <span>Documentation</span>
            <FiExternalLink className="h-4 w-4 ml-auto" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectLinks;
