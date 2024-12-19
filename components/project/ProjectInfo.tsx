import React from "react";
import { FiActivity, FiTag } from "react-icons/fi";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@projectConstants";
import { Project } from "@types";

const ProjectInfo = ({ project }: { project: Project }) => {
  const category = PROJECT_CATEGORIES.find((cat) => cat.value === project.category);
  const status = PROJECT_STATUSES.find((s) => s.value === project.status);

  return (
    <div className="flex md:flex-row flex-col items-center justify-between gap-4 rounded-xl bg-[#161B22] p-4 ring-1 ring-white/10">
      <div className="flex md:flex-row flex-col items-center gap-4">
        <div
          style={{ color: status?.color }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium bg-[#1C2128] transition-colors hover:bg-[#242B35]"
        >
          <FiActivity />
          {status?.label || "In Progress"}
        </div>
        <div
          style={{ color: "#2DD4BF" }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium bg-[#1C2128] transition-colors hover:bg-[#242B35]"
        >
          <FiTag />
          {category?.label || "Web App"}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>{project.techStack.length} Technologies</span>
        <span>•</span>
        <span>{project.keyFeatures.length} Features</span>
      </div>
    </div>
  );
};

export default ProjectInfo;
