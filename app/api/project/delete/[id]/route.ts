import { auth } from "@auth";
import connectDB from "@lib/db";
import Project from "@models/Project";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized, no session" }, { status: 401 });
  }
  const url = new URL(request.url);
  const projectId = url.pathname.split("/").pop();

  await connectDB();

  const project = await Project.findById(projectId);

  if (!project) {
    return NextResponse.json({ message: "project not found" }, { status: 400 });
  } else if (project.author.toString() !== session.user.id) {
    return NextResponse.json({ message: "Unauthorized, you can only edit your own projects" }, { status: 401 });
  }

  try {
    await Project.findByIdAndDelete(projectId);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
