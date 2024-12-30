import React from "react";
import { auth } from "@auth";
import { redirect } from "next/navigation";
import Profile from "@components/user/Profile";

export default async function ProfilePagePrivate() {
  const session = await auth();
  console.log("Session:", session);

  if (!session?.user?.id) {
    console.log("No user ID, redirecting");
    redirect("/login?callbackUrl=/my-profile");
  }

  return (
    <Profile
      userId={session.user.id}
      viewMode="private"
    />
  );
}
