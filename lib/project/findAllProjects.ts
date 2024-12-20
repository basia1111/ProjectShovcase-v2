import Project from "@models/Project";
import connectDB from "@lib/db";

export const findAllProjects = async (id: string | null = null) => {
  await connectDB();

  try {
    const allProjects = await Project.find().populate("author", "name image _id");

    const projectsWithCheckedLikes = allProjects.map((project) => ({
      ...project.toObject(),
      isLikedByUser: id ? project.likedBy.includes(id) : false,
    }));

    return projectsWithCheckedLikes;
  } catch (error) {
    console.error("Error finding user projects:", error);
    throw error;
  }
};
