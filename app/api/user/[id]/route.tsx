import connectDB from "@lib/db";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  await connectDB();

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const serializedUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user?.image,
      professionalTitle: user?.professionalTitle,
      city: user?.city,
      about: user?.about,
      socialMedia: user?.socialMedia ? { ...user.socialMedia } : null,
      coverImage: user?.coverImage,
    };
    console.error(user);
    return NextResponse.json({ user: serializedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
