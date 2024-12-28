/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaPaintBrush } from "react-icons/fa";
import EditProfileCoverForm from "../forms/EditProfileCoverForm";
import ModalButton from "@components/common/buttons/ModalButton";
import { User } from "@types";

type CoverProps = {
  user: User;
  isOwner: boolean;
};

const Cover = ({ user, isOwner }: CoverProps) => {
  return (
    <div className="relative md:h-[300px] h-[200px]">
      {user?.coverImage ? (
        <img
          src={user.coverImage}
          alt="Cover"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="relative h-full w-full bg-[#161B22] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform">
              <div
                className="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      )}

      {isOwner && (
        <div className="absolute md:right-6 md:top-6 top-3 right-3 flex gap-2">
          <ModalButton
            modalContent={<EditProfileCoverForm />}
            className="inline-flex items-center md:text-base text-xs gap-2 rounded-lg bg-[#161B22] px-4 py-2  font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-[#1C2128]"
          >
            <FaPaintBrush className="md:size-4 size-3" />
            Edit Cover
          </ModalButton>
        </div>
      )}
    </div>
  );
};

export default Cover;
