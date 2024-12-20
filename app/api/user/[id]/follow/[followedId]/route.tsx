import { auth } from "@auth";
import connectDB from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string; followedId: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, followedId } = params;

  if (!id || !followedId) {
    return NextResponse.json({ message: "Incomplete request" }, { status: 404 });
  }

  await connectDB();

  return NextResponse.json({ message: "Success" });
}
