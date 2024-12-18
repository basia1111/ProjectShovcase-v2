import { auth } from "@auth";
import connectDB from "@lib/db";
import Project from "@models/Project";
import cloudinary from "@utils/claudinary";
import { NextRequest, NextResponse } from "next/server";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();

  await connectDB();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const email = formData.get("email") as string;
  const inputFile = formData.get("cover") as File | null;
  const status = formData.get("status") as string;
  const category = formData.get("category") as string;
  const techStackString = formData.get("techStack") as string;
  const techStack = JSON.parse(techStackString);
  const keyFeaturesString = formData.get("keyFeatures") as string;
  const keyFeatures = JSON.parse(keyFeaturesString);
  const liveDemo = formData.get("liveDemo") as string;
  const documentation = formData.get("documentation") as string;
  const gitHub = formData.get("gitHub") as string;
  const author = session.user.id;

  console.log("Received form data:", {
    title,
    description,
    email,
    status,
    category,
    techStack,
    keyFeatures,
    author,
  });

  if (!title || !description || !category || !status || !inputFile || !techStack || !keyFeatures || !inputFile) {
    return NextResponse.json({ message: "Sections marked with * are required" }, { status: 400 });
  }

  try {
    const bytes = await inputFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "public", `temp-${session.user.id}`);

    await writeFile(path, buffer);

    const uploadResponse = await cloudinary.uploader.upload(path, {
      folder: "project_cover_pictures",
      public_id: `${author}_${title.replace(/\s+/g, "_")}`,
    });

    const newProject = new Project({
      title,
      description,
      email,
      author,
      cover: uploadResponse.secure_url,
      category,
      status,
      techStack,
      keyFeatures,
      ...(liveDemo && { liveDemo }),
      ...(gitHub && { gitHub }),
      ...(documentation && { documentation }),
    });

    await newProject.save();
    await unlink(path);

    return NextResponse.json({ newProject });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
