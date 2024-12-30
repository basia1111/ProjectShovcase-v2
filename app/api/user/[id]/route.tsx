import connectDB from "@lib/db";
import User from "@models/User";
import Project from "@models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  await connectDB();

  try {
    const user = await User.findById(id).populate("likedProjects").populate("followedBy", "_id name image").populate("following", "_id name image");
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User found", user);
    const plainUser = user.toObject();
    const serializedUser = {
      ...plainUser,
      _id: user._id.toString(),
      id: user._id.toString(),
      socialMedia: { ...plainUser.socialMedia },
    };
    return NextResponse.json({ user: serializedUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
