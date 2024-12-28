import { NextResponse, NextRequest } from "next/server";
import connectDB from "@lib/db";
import { findUserProjects } from "@lib/user/findUserProjects";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  await connectDB();

  try {
    const userProjects = await findUserProjects(id);

    return NextResponse.json(
      {
        projects: userProjects,
        message: userProjects?.length === 0 ? "You do not have any projects yet" : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Project fetch error:", error);
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
