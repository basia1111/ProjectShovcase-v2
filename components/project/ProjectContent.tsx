"use client";

import React, { useState } from "react";
import { Project } from "@types";
import Header from "./Header";
import ProjectInfo from "./ProjectInfo";
import TechStack from "./TechStack";
import ProjectDescription from "./ProjectDescription";
import KeyFeatures from "./KeyFeatures";
import ProjectUpdates from "./ProjectUpdates";
import ProjectLinks from "./ProjectLinks";
import ProjectButtons from "./ProjectButtons";

const ProjectContent = ({ project: fetchedProject, mode }: { project: Project; mode: "private" | "public" }) => {
  const [project, setProject] = useState<Project>(fetchedProject);
  return (
    <div className="min-h-screen w-full bg-[#0D1117] pt-20 -mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Header
          project={project}
          mode={mode}
          setProject={setProject}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* Left Column */}
          <div className="space-y-8">
            <ProjectInfo project={project} />
            <TechStack project={project} />
            <ProjectDescription project={project} />
            <KeyFeatures project={project} />
            <ProjectUpdates />
          </div>

          {/* Right Column*/}
          <div className="space-y-6">
            <ProjectButtons project={project} />
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
