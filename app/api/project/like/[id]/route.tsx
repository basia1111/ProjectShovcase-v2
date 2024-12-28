import { auth } from "@auth";
import connectDB from "@lib/db";
import Project from "@models/Project";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized, no session" }, { status: 401 });
  }
  const userSession: string = session.user.id;
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Project ID is required" }, { status: 404 });
  }

  await connectDB();

  try {
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const user = await User.findById(userSession);
    if (!user) {
      return NextResponse.json({ message: "Logged user not found" }, { status: 404 });
    }

    const wasLikedByUser = project.likedBy.includes(session.user.id);
    if (wasLikedByUser) {
      await Project.findByIdAndUpdate(
        id,
        {
          $pull: { likedBy: userSession },
          $inc: { likeCount: -1 },
        },

        {
          new: true,
        }
      );

      await User.findByIdAndUpdate(userSession, {
        $pull: { likedProjects: id },
      });
    } else {
      await Project.findByIdAndUpdate(
        id,
        {
          $push: { likedBy: userSession },
          $inc: { likeCount: 1 },
        },

        {
          new: true,
        }
      );
      await User.findByIdAndUpdate(userSession, {
        $push: { likedProjects: id },
      });
    }

    return NextResponse.json({ wasLikedByUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
