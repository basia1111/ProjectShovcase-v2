/* eslint-disable @next/next/no-img-element */
import ModalButton from "@components/common/buttons/ModalButton";
import { Project } from "@types";
import Link from "next/link";
import React from "react";
import { FiCalendar, FiEdit } from "react-icons/fi";

type HeaderProps = {
  mode: "private" | "public";
  project: Project;
};
const Header = ({ mode, project }: HeaderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-[#161B22] shadow-xl ring-1 ring-white/10">
      <div className="relative h-[400px]">
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/70 to-transparent" />

        {mode === "private" && (
          <div className="absolute right-6 top-6 flex gap-2">
            <ModalButton
              modalContent={<p>Modal content</p>}
              className="inline-flex items-center gap-2 rounded-lg bg-[#161B22]/90 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-[#1C2128]"
            >
              <FiEdit className="h-4 w-4" />
              Edit Project
            </ModalButton>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="mb-6 text-4xl font-bold text-white">{project.title}</h1>
          <Link
            href={`/profile/${project.author._id}`}
            className="group flex items-center gap-3 text-gray-300 hover:text-white"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-teal-500/30 group-hover:ring-teal-500/50 transition-all">
              <img
                src={project.author.image || "/images/avatar.png"}
                alt={project.author.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="font-medium block">{project.author.name}</span>
              <span className="text-sm text-gray-400">
                <FiCalendar className="inline-block h-4 w-4 text-teal-500 mr-2" />
                {formatDate(project.createdAt)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
