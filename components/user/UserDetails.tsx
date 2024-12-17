"use client";

import { User } from "@types";
import React from "react";
import { FiMapPin } from "react-icons/fi";

const UserDetails = ({ user }: { user: User }) => {
  return (
    <div className="text-gray-400 mt-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      {user?.professionalTitle && (
        <>
          <span>{user?.professionalTitle}</span>
          <span className="hidden lg:inline">•</span>
        </>
      )}
      {user?.city && (
        <div className="flex items-center gap-2">
          <FiMapPin className="h-4 w-4" />
          {user?.city}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
