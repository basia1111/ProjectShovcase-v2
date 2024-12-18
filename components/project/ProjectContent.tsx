"use client";

import React from "react";
import { Project } from "@types";

const ProjectContent = ({ project, mode }: { project: Project; mode: "private" | "public" }) => {
  return <div className="min-h-screen w-full bg-[#0D1117] pt-20 -mt-20"></div>;
};

export default ProjectContent;
