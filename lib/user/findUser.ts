"use server";

import connectDB from "@lib/db";
import User from "@models/User";
import Project from "@models/Project";
import { Project as ProjectType, User as UserType } from "@types";

export const findUser = async (email: string) => {
  await connectDB();

  if (!email) {
    return null;
  }

  const returnedUser = await User.findOne({ email })
    .populate("likedProjects", "_id title cover")
    .populate("followedBy", "_id name image")
    .populate("following", "_id name image");

  if (!returnedUser) return null;

  const plainUser = returnedUser.toObject();

  const sanitizedFollowing = plainUser.following.map((item: Partial<UserType>) => ({
    _id: item._id ? item._id.toString() : "",
    name: item.name,
    image: item.image,
  }));

  const sanitizedFollowedBy = plainUser.followedBy.map((item: Partial<UserType>) => ({
    _id: item._id ? item._id.toString() : "",
    name: item.name,
    image: item.image,
  }));

  const sanitizedLikedProjects = plainUser.likedProjects.map((item: Partial<ProjectType>) => ({
    ...item,
    _id: item._id ? item._id.toString() : "",
  }));

  const sanitizedUser = {
    ...plainUser,
    _id: plainUser._id.toString(),
    id: plainUser._id.toString(),
    following: sanitizedFollowing,
    followedBy: sanitizedFollowedBy,
    likedProjects: sanitizedLikedProjects,
    socialMedia: { ...plainUser.socialMedia },
  };

  return sanitizedUser;
};
