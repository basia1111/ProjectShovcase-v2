import connectDB from "@lib/db";
import Project from "@models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  await connectDB();

  try {
    const project = await Project.findById(id).populate("author", "_id name image").lean();
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
