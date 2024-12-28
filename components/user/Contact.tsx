import LoginModalContent from "@components/common/LoginModalContent";
import { ModalContext } from "@contexts/ModalContext";
import { User } from "@types";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

type UserContact = {
  user: User;
  isOwner?: boolean;
};

const Contact = ({ user }: UserContact) => {
  const { data } = useSession();
  const { openModal } = useContext(ModalContext)!;

  return (
    <div className="flex flex-row  md:w-auto w-full  justify-between items-end gap-3">
      <div>
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
      <div>
        {data?.user?.id ? (
          <a
            href={`mailto:${user.email}`}
            className="inline-flex w-full  items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 group bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
          >
            <FiMail className="h-4 w-4" />
            Contact
          </a>
        ) : (
          <a
            onClick={() => openModal(<LoginModalContent />)}
            className="inline-flex w-full  items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 group bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
          >
            <FiMail className="h-4 w-4" />
            Contact
          </a>
        )}
      </div>
    </div>
  );
};

export default Contact;
