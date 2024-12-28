import { auth } from "@auth";
import connectDB from "@lib/db";
import Project from "@models/Project";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  await connectDB();

  try {
    const fetchedProject = await Project.findById(id).populate("author", "_id name image");
    if (!fetchedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    const project = {
      ...fetchedProject.toObject(),
      isLikedByUser: userId ? fetchedProject.likedBy?.includes(userId) : false,
    };
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
