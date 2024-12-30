import { auth } from "@auth";
import connectDB from "@lib/db";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string; followedId: string } }) {
  console.log("[DEBUG] Request params:", params);

  try {
    const session = await auth();
    console.log("[DEBUG] Auth session:", session);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    console.log("[DEBUG] DB connected");

    const { id, followedId } = params;
    if (!id || !followedId) {
      return NextResponse.json({ message: "Missing IDs" }, { status: 400 });
    }

    const [sessionUser, userToFollow] = await Promise.all([User.findById(id), User.findById(followedId)]);
    console.log("[DEBUG] Found users:", { sessionUser: !!sessionUser, userToFollow: !!userToFollow });

    if (!sessionUser || !userToFollow) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const wasFollowedByUser = userToFollow.followedBy.includes(id);
    console.log("[DEBUG] Was followed:", wasFollowedByUser);

    if (wasFollowedByUser) {
      await Promise.all([User.findByIdAndUpdate(followedId, { $pull: { followedBy: id } }), User.findByIdAndUpdate(id, { $pull: { following: followedId } })]);
    } else {
      await Promise.all([User.findByIdAndUpdate(followedId, { $push: { followedBy: id } }), User.findByIdAndUpdate(id, { $push: { following: followedId } })]);
    }

    return NextResponse.json({ wasFollowedByUser }, { status: 200 });
  } catch (error) {
    console.error("[DEBUG] Error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
