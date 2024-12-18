"use client";

import React, { useState } from "react";
import { Project } from "@types";
import Header from "./Header";
import ProjectInfo from "./ProjectInfo";
import TechStack from "./TechStack";
import ProjectDescription from "./ProjectDescription";
import KeyFeatures from "./KeyFeatures";
import ProjectLinks from "./ProjectLinks";
import ProjectButtons from "./ProjectButtons";

const ProjectContent = ({ project: fetchedProject, mode }: { project: Project; mode: "private" | "public" }) => {
  const [project, setProject] = useState<Project>(fetchedProject);
  return (
    <div className="min-h-screen w-full bg-[#0D1117] pt-20 -mt-20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-24 -top-24 h-96 w-96 rounded-full bg-[#2DD4BE] opacity-[0.02] blur-3xl" />
        <div className="absolute -left-24 top-1/2 h-96 w-96 rounded-full bg-[#2DD4BE] opacity-[0.02] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,212,191,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.01)_1px,transparent_1px)] bg-[size:14px_14px]" />
      </div>
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
