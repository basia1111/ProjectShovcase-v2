import { auth } from "@auth";
import connectDB from "@lib/db";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized, no session" }, { status: 401 });
  }

  await connectDB();

  const name = formData.get("name") as string;
  const professionalTitle = formData.get("professionalTitle") as string;
  const city = formData.get("city") as string;
  const twitter = formData.get("twitter") as string;
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;

  if (!name) {
    return NextResponse.json({ message: "Name is required field." }, { status: 400 });
  }

  try {
    const updatedtUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: name,
        city: city,
        professionalTitle: professionalTitle,
        "socialMedia.twitter": twitter,
        "socialMedia.github": github,
        "socialMedia.linkedin": linkedin,
      },
      {
        new: true,
        strict: false,
        timestamps: false,
      }
    );

    return NextResponse.json({ user: updatedtUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}
