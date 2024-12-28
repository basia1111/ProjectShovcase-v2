import Card from "@components/common/Card";
import { Project } from "@types";
import React from "react";

const TopProjects = ({ projects }: { projects: Project[] }) => {
  const topProjects = projects.sort((a, b) => a.likeCount - b.likeCount).slice(0, 5);
  return (
    <div className="lg:w-80">
      <Card className="sticky top-24 rounded-2xl flex-col w-full px-4 md:px-6 py-6 items-start justify-start">
        <h2 className="mb-6 text-lg font-semibold text-white">Top Projects</h2>

        <div className="space-y-4">
          {topProjects.map((project, index) => (
            <div
              key={project._id}
              className="flex items-start space-x-4 rounded-lg p-2 hover:bg-white/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500/10 font-semibold text-emerald-400">{index + 1}</div>
              <div className="flex-1">
                <h3 className="font-medium text-white hover:text-emerald-400">{project.title}</h3>
                <p className="text-gray-400 text-sm">Total {project.likeCount} likes</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TopProjects;
