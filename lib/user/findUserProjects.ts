import Project from "@models/Project";
import connectDB from "@lib/db";
import { auth } from "@auth";

export const findUserProjects = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  console.log(session?.user?.id);
  if (!id) {
    throw new Error("User ID is required");
  }

  await connectDB();

  try {
    const userProjects = await Project.find({ author: id }).populate("author", "name _id image");

    const projectsWithCheckedLikes = userProjects.map((project) => ({
      ...project.toObject(),
      isLikedByUser: userId ? project.likedBy?.includes(userId) : false,
    }));

    console.log();
    return projectsWithCheckedLikes;
  } catch (error) {
    console.error("Error finding user projects:", error);
    throw error;
  }
};
