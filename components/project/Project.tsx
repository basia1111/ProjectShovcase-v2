import { Project as ProjectType } from "@types";
import { notFound } from "next/navigation";
import React from "react";
import ProjectContent from "./ProjectContent";
import { auth } from "@auth";
import { cookies } from "next/headers";

type ProjectProps = {
  id: string;
};

const Project = async ({ id }: ProjectProps) => {
  const session = await auth();

  async function fethProject(id: string): Promise<ProjectType | null> {
    const nextCookies = await cookies();

    console.log(nextCookies);
    try {
      const response = await fetch(`${process.env.API_URL}/api/project/${id}`, {
        method: "GET",
        headers: {
          Cookie: `${nextCookies}`,
        },
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
