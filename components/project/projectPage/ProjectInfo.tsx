import React from "react";
import { FiActivity, FiTag } from "react-icons/fi";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@projectConstants";
import { Project } from "@types";
import Like from "../Like";

const ProjectInfo = ({ project }: { project: Project }) => {
  const category = PROJECT_CATEGORIES.find((cat) => cat.value === project.category);
  const status = PROJECT_STATUSES.find((s) => s.value === project.status);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#161B22] p-5 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div
            style={{ color: status?.color }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1C2128] px-4 py-2 text-sm font-medium ring-1 ring-white/10 transition-all hover:bg-[#242B35] hover:ring-white/20"
          >
            <FiActivity className="h-4 w-4" />
            <span>{status?.label || "In Progress"}</span>
          </div>
          <div
            style={{ color: "#2DD4BF" }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1C2128] px-4 py-2 text-sm font-medium ring-1 ring-white/10 transition-all hover:bg-[#242B35] hover:ring-white/20"
          >
            <FiTag className="h-4 w-4" />
            <span>{category?.label || "Web App"}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <Like project={project} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 pt-4 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-500/50" />
          <span>{project.techStack.length} Technologies</span>
        </div>
        <div className="h-1 w-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-500/50" />
          <span>{project.keyFeatures?.length} Features</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
