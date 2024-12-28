/* eslint-disable @next/next/no-img-element */
import React from "react";
import { auth } from "@auth";
import AccountActionsDropdown from "./AccountActionsDropdown";

const AccountActions = async () => {
  const session = await auth();
  return (
    <div className="w-50 z-50 hidden justify-end font-Inter text-white/90 lg:flex">
      {session?.user ? (
        <div className="flex w-full items-center gap-2 text-right">
          <a
            href="/my-profile"
            className="cursor-pointer"
          >
            <img
              src={session.user.image || "/images/avatar.png"}
              alt="profile picture"
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border border-white/10 object-cover transition-opacity hover:opacity-80"
            />
          </a>
          <AccountActionsDropdown />
        </div>
      ) : (
        <>
          <a
            className="flex items-center rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-white hover:from-teal-500 hover:to-emerald-500"
            href="/register"
          >
            Sign up
          </a>
          <a
            className="ml-2 rounded-md px-4 py-2 text-white/80 transition-colors hover:text-white"
            href="/login"
          >
            Sign in
          </a>
        </>
      )}
    </div>
  );
};

export default AccountActions;
