import { Project } from "@types";
import React from "react";

const KeyFeatures = ({ project }: { project: Project }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-[#161B22] ring-1 ring-white/10">
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Key Features</h2>
        <span className="text-sm text-teal-500">{project.keyFeatures.length} features</span>
      </div>
      <div className="grid gap-px bg-white/5">
        {project.keyFeatures.map((feature, index) => (
          <div
            key={index}
            className="group bg-[#161B22] p-6 transition-colors hover:bg-[#1C2128]"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10">
                <span className="text-sm font-medium text-teal-500">{index + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-400 pl-9">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
