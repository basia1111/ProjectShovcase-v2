import Project from '@models/Project';
import connectDB from '@lib/db';

export const findAllProjects = async () => {
  await connectDB();

  try {
    const allProjects = await Project.find().populate('author', 'name image _id').lean();
    return allProjects;
  } catch (error) {
    console.error('Error finding user projects:', error);
    throw error;
  }
};
