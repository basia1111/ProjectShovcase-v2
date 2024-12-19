"use client";
import React from "react";
import Image from "next/image";
import { FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiMail, FiPackage, FiCalendar } from "react-icons/fi";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { User } from "@types";
import ModalButton from "@components/common/buttons/ModalButton";
import EditUserDataForm from "../forms/EditUserDataForm";
import EditProfileImageForm from "../forms/EditProfileImageForm";
import { Stat } from "./Stat";

type UserInfoProps = {
  user: User;
  isOwner: boolean;
  projectsNumber: number;
};

const UserInfo = ({ user, isOwner, projectsNumber }: UserInfoProps) => {
  const formatJoinDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="border-t border-white/10 bg-[#161B22] md:p-6 p-3">
      <div className="flex md:flex-row flex-col items-start justify-between gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative md:-mt-16">
              <div className="md:h-32 md:w-32 w-16 h-16 overflow-hidden rounded-xl bg-[#161B22] ring-4 ring-[#161B22]">
                <Image
                  src={user?.image || "/images/avatar.png"}
                  alt={user?.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {isOwner && (
                <ModalButton
                  modalContent={<EditProfileImageForm />}
                  className="absolute -right-2 -top-2 rounded-full bg-[#1C2128] p-2 text-gray-400 ring-1 ring-white/10 hover:text-white hover:bg-[#242B35] transition-all duration-300"
                >
                  <FaCamera className="md:size-4 size-3" />
                </ModalButton>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="md:text-3xl text-xl font-bold text-white">{user?.name}</h1>
                {isOwner && (
                  <ModalButton
                    modalContent={<EditUserDataForm />}
                    className="rounded-full bg-[#1C2128] p-2 text-gray-400 ring-1 ring-white/10 hover:text-white hover:bg-[#242B35] transition-all duration-300"
                  >
                    <FaPencilAlt className="md:size-4 size-3" />
                  </ModalButton>
                )}
              </div>
              <p className="text-gray-400 md:-text-base text-xs">{user?.professionalTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Stat
              icon={FiPackage}
              value={`${projectsNumber} ${projectsNumber == 1 ? "Project" : "Projects"}`}
            />
            {user?.city && (
              <Stat
                icon={FiMapPin}
                value={user.city}
              />
            )}
            {user?.createdAt && (
              <Stat
                icon={FiCalendar}
                value={`Joined ${formatJoinDate(user.createdAt)}`}
              />
            )}
          </div>
        </div>

        <div className="flex md:flex-col flex-row  md:w-auto w-full md:justify-normal justify-between items-end gap-3">
          <a
            href={`mailto:${user.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 group bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
          >
            <FiMail className="h-4 w-4" />
            Contact
          </a>
          <div className="flex items-center gap-2">
            {user?.socialMedia?.github && (
              <a
                href={user.socialMedia.github}
                className="rounded-lg bg-[#1C2128] p-2 text-gray-400 ring-1 ring-white/10 hover:bg-[#242B35] hover:text-white transition-colors"
              >
                <FiGithub className="h-5 w-5" />
              </a>
            )}
            {user?.socialMedia?.linkedin && (
              <a
                href={user.socialMedia.linkedin}
                className="rounded-lg bg-[#1C2128] p-2 text-gray-400 ring-1 ring-white/10 hover:bg-[#242B35] hover:text-white transition-colors"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            )}
            {user?.socialMedia?.twitter && (
              <a
                href={user.socialMedia.twitter}
                className="rounded-lg bg-[#1C2128] p-2 text-gray-400 ring-1 ring-white/10 hover:bg-[#242B35] hover:text-white transition-colors"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
