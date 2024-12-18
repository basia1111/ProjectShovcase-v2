import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@utils/claudinary";
import { auth } from "@/auth";
import User from "@/models/User";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";
import connectDB from "@lib/db";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized, no session" }, { status: 401 });
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
    const path = join(process.cwd(), "public", `temp-${session.user.id}`);

    await writeFile(path, buffer);

    const uploadResponse = await cloudinary.uploader.upload(path, {
      folder: "profile_pictures",
      public_id: session.user.id,
    });

    const updatedUser = await User.findByIdAndUpdate(session.user.id, { image: uploadResponse.secure_url }, { new: true });

    await unlink(path);

    return NextResponse.json({ image: uploadResponse.secure_url, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
