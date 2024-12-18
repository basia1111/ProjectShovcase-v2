import { NextResponse } from "next/server";
import connectDB from "@lib/db";
import { findAllProjects } from "@lib/project/findAllProjects";

export async function GET() {
  await connectDB();

  try {
    const allProjects = await findAllProjects();

    return NextResponse.json(
      {
        projects: allProjects,
        message: allProjects?.length === 0 ? "There are no projects yeat" : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Project fetch error:", error);
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
