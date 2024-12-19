import React from "react";
import ExploreContent from "./ExploreContent";

const fetchProjects = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/project/projects`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data.message);
      return null;
    }
    return data.projects;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const Explore = async () => {
  const projects = await fetchProjects();
  return (
    <div className="-mt-20 min-h-screen w-full bg-[#0D1117] pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 md:py-12 py-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Discover <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-gray-400 mt-2 text-md md:text-lg">Where innovation meets creativity</p>
        </div>

        <ExploreContent projects={projects} />
      </div>
    </div>
  );
};

export default Explore;
