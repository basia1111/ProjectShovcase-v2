"use server";

import connectDB from "@lib/db";
import User from "@models/User";

export const findUser = async (email: string) => {
  await connectDB();

  if (!email) {
    return null;
  }

  const user = await User.findOne({ email })
    .populate("likedProjects", "_id, title, cover")
    .populate("followedBy", "_id name image")
    .populate("following", "_id name image");

  if (!user) return null;

  const plainUser = user.toObject();

  const sanitizedFollowing = plainUser.following.map((item: any) => ({
    _id: item._id.toString(),
    name: item.name,
    image: item.image,
  }));

  const sanitizedFollowedBy = plainUser.followedBy.map((item: any) => ({
    _id: item._id.toString(),
    name: item.name,
    image: item.image,
  }));

  const sanitizedLikedProjects = plainUser.likedProjects.map((item: any) => ({
    ...item,
    _id: item._id.toString(),
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
