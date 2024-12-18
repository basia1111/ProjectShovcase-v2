import Project from "@models/Project";
import connectDB from "@lib/db";

export const findUserProjects = async (id: string) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  await connectDB();

  try {
    const userProjects = await Project.find({ author: id }).populate("author", "name _id image").lean();
    return userProjects;
  } catch (error) {
    throw error;
  }
};
