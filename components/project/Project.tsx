import { Project as ProjectType } from "@types";
import { notFound } from "next/navigation";
import React from "react";
import ProjectContent from "./ProjectContent";
import { auth } from "@auth";

type ProjectProps = {
  id: string;
};
async function fethProject(id: string): Promise<ProjectType | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/project/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.project as ProjectType;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
const Project = async ({ id }: ProjectProps) => {
  const session = await auth();
  const project = await fethProject(id);

  if (!project) {
    notFound();
  }

  const mode = session?.user?.id == project.author._id ? "private" : "public";

  return (
    <ProjectContent
      project={project}
      mode={mode}
    />
  );
};

export default Project;
