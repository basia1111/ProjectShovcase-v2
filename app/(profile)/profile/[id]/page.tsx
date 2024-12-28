import React from "react";
import Profile from "@components/user/Profile";

export default async function ProfilePagePublic({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <Profile
      userId={id}
      viewMode="public"
    />
  );
}
