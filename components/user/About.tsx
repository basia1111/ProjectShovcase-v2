"use client";

import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import EditUserAboutForm from "../forms/EditUserAboutForm";
import ModalButton from "@components/common/buttons/ModalButton";
import { User } from "@types";

type AboutProps = {
  user: User;
  isOwner: boolean;
};

const About = ({ user, isOwner }: AboutProps) => {
  return (
    <div className="rounded-xl bg-[#161B22] p-6 ring-1 ring-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">About</h2>
        {isOwner && (
          <ModalButton
            modalContent={<EditUserAboutForm />}
            className="rounded-full bg-[#1C2128] p-2 text-gray-400 ring-1 ring-white/10 hover:text-white hover:bg-[#242B35] transition-all duration-300"
          >
            <FaPencilAlt className="h-4 w-4" />
          </ModalButton>
        )}
      </div>
      <p className="text-gray-400">{user?.about}</p>
    </div>
  );
};

export default About;
