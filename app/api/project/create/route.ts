import { auth } from "@auth";
import connectDB from "@lib/db";
import Project from "@models/Project";
import cloudinary from "@utils/claudinary";
import { NextRequest, NextResponse } from "next/server";
import { PassThrough } from "stream";

type CloudinaryResponse = {
  secure_url: string;
  [key: string]: any;
};

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();

  await connectDB();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized, no session" }, { status: 401 });
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const email = formData.get("email") as string;
  const inputFile = formData.get("cover") as File | null;
  const status = formData.get("status") as string;
  const category = formData.get("category") as string;
  const techStack = JSON.parse(formData.get("techStack") as string);
  const keyFeatures = JSON.parse(formData.get("keyFeatures") as string);
  const liveDemo = formData.get("liveDemo") as string;
  const documentation = formData.get("documentation") as string;
  const gitHub = formData.get("gitHub") as string;
  const author = session.user.id;

  if (!title || !description || !email || !category || !status || !inputFile || !techStack || !keyFeatures || !inputFile) {
    return NextResponse.json({ message: "Sections marked with * are required" }, { status: 400 });
  }

  try {
    const bytes = await inputFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const passthroughStream = new PassThrough();
      passthroughStream.end(buffer);

      cloudinary.uploader
        .upload_stream(
          {
            folder: "project_cover_pictures",
            public_id: `${author}_${title.replace(/\s+/g, "_")}`,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            resolve(result as CloudinaryResponse);
          }
        )
        .end(buffer);
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
    if (!newProject) {
      return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
    }
    return NextResponse.json({ newProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
