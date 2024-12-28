import { auth } from "@auth";
import connectDB from "@lib/db";

import User from "@models/User";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string; followedId: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, followedId } = await params;

  if (!id || !followedId) {
    return NextResponse.json({ message: "Incomplete request" }, { status: 404 });
  }

  await connectDB();

  try {
    const sessionUser = await User.findById(id);
    if (!sessionUser) {
      return NextResponse.json({ message: "Logged user not found" }, { status: 404 });
    }
    const user = await User.findById(followedId);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const wasFollowedByUser = user.followedBy.includes(id);
    if (wasFollowedByUser) {
      await User.findByIdAndUpdate(followedId, {
        $pull: { followedBy: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { following: followedId },
      });
    } else {
      await User.findByIdAndUpdate(followedId, {
        $push: { followedBy: id },
      });
      await User.findByIdAndUpdate(id, {
        $push: { following: followedId },
      });
    }
    return NextResponse.json({ wasFollowedByUser }, { status: 200 });
  } catch (error) {
    console.error("Follow operation failed:", error);
    return NextResponse.json({ message: `Failed to process follow request ${error}` }, { status: 500 });
  }

  return NextResponse.json({ message: "Success" });
}
