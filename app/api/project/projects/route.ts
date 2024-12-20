import { NextRequest, NextResponse } from "next/server";
import connectDB from "@lib/db";
import { findAllProjects } from "@lib/project/findAllProjects";
import { auth } from "@auth";

export async function GET(request: NextRequest) {
  const session = await auth();

  console.log("projects session", session);
  await connectDB();

  try {
    const allProjects = await findAllProjects(session?.user?.id);

    return NextResponse.json(
      {
        projects: allProjects,
        message: allProjects?.length === 0 ? "There are no projects yeat" : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
