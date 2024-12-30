import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@utils/claudinary";
import { auth } from "@/auth";
import User from "@/models/User";
import { PassThrough } from "stream";
import connectDB from "@lib/db";
import { Session } from "next-auth";
type CloudinaryResponse = {
  secure_url: string;
  [key: string]: any;
};

export async function POST(request: NextRequest) {
  const session = (await auth()) as Session & {
    user: {
      id: string;
      [key: string]: any;
    };
  };
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const formData = await request.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const passthroughStream = new PassThrough();
      passthroughStream.end(buffer);

      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile_pictures",
            public_id: session.user.id,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error", error);
              return reject(error);
            }
            resolve(result as CloudinaryResponse);
          }
        )
        .end(buffer);
    });
    const updatedUser = await User.findByIdAndUpdate(session.user.id, { image: uploadResponse.secure_url }, { new: true });

    return NextResponse.json({ image: uploadResponse.secure_url, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
