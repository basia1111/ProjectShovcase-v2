import { auth } from "@auth";
import connectDB from "@lib/db";
import Project from "@models/Project";
import cloudinary from "@utils/claudinary";
import { writeFile, unlink } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import { join } from "path";

type UpdateData = {
  title: string;
  description: string;
  email: string;
  status: string;
  category: string;
  author: string;
  techStack: string[];
  keyFeatures: { title: string; description: string }[];
  liveDemo: string;
  gitHub: string;
  documentation: string;
  cover?: string;
};

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized, no session" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    await connectDB();

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    if (project.author.toString() !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized, you can only edit your own projects" }, { status: 401 });
    }

    const formData = await request.formData();

    const updateData: UpdateData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      email: formData.get("email") as string,
      status: formData.get("status") as string,
      category: formData.get("category") as string,
      author: session.user.id,
      techStack: JSON.parse(formData.get("techStack") as string),
      keyFeatures: JSON.parse(formData.get("keyFeatures") as string),
      liveDemo: formData.get("liveDemo") as string,
      gitHub: formData.get("gitHub") as string,
      documentation: formData.get("documentation") as string,
    };

    if (
      !updateData.title ||
      !updateData.description ||
      !updateData.email ||
      !updateData.category ||
      !updateData.status ||
      !updateData.techStack ||
      !updateData.keyFeatures
    ) {
      return NextResponse.json({ message: "Sections marked with * are required" }, { status: 400 });
    }

    const inputFile = formData.get("cover") as File | null;

    if (inputFile && inputFile.size > 0) {
      try {
        const bytes = await inputFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = join(process.cwd(), "public", `temp-${session.user.id}-${Date.now()}`);

        await writeFile(tempPath, buffer);

        const uploadResponse = await cloudinary.uploader.upload(tempPath, {
          folder: "project_cover_pictures",
          public_id: `${session.user.id}_${updateData.title.toString().replace(/\s+/g, "_")}`,
        });
        await unlink(tempPath).catch(console.error);

        updateData.cover = uploadResponse.secure_url;
      } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("author", "name image _id");

    if (!updatedProject) {
      return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
    }

    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
