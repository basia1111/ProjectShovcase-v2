"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "@contexts/UserContext";
import Cover from "./Cover";
import UserInfo from "./UserInfo";
import About from "./About";
import Projects from "./Projects";
import { User } from "@types";

type ProfileProps = {
  user: User;
  viewMode: "private" | "public";
};

const ProfileContent = ({ user: serverUser, viewMode }: ProfileProps) => {
  const { user: contextUser } = useContext(UserContext)!;
  const [projectsNumber, setProjectsNumber] = useState<number>(0);
  const user = viewMode === "private" ? contextUser || serverUser : serverUser;
  const isOwner = viewMode === "private";

  return (
    <div className="min-h-screen w-full bg-[#0D1117]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-24 -top-24 h-96 w-96 rounded-full bg-[#2DD4BE] opacity-[0.02] blur-3xl" />
        <div className="absolute -left-24 top-1/2 h-96 w-96 rounded-full bg-[#2DD4BE] opacity-[0.02] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,212,191,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.01)_1px,transparent_1px)] bg-[size:14px_14px]" />
      </div>

      <div className="mx-auto max-w-6xl md:px-6 px-4 py-8">
        <div className="mb-6 overflow-hidden rounded-xl bg-[#161B22] shadow-xl ring-1 ring-white/10">
          <Cover
            user={user}
            isOwner={isOwner}
          />
          <UserInfo
            user={user}
            isOwner={isOwner}
            projectsNumber={projectsNumber}
          />
        </div>

        <div className="space-y-6">
          <About
            user={user}
            isOwner={isOwner}
          />
          <Projects
            user={user}
            isOwner={isOwner}
            setProjectsNumber={setProjectsNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
