import React from "react";
import ProfileContent from "./ProfileContent";
import { User } from "@types";
import { notFound } from "next/navigation";

type ProfileProps = {
  userId: string;
  viewMode: "private" | "public";
};
async function fetchUser(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/user/${userId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.user as User;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

const Profile = async ({ userId, viewMode }: ProfileProps) => {
  const user = await fetchUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <ProfileContent
      viewMode={viewMode}
      user={user}
    />
  );
};

export default Profile;
