'use client';

import { User } from '@types';
import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

const SocialLinks = ({ user }: { user: User }) => {
  return (
    <div className="mt-6 flex w-full justify-between border-b border-[#21262D] pb-6">
      <div className="flex gap-4">
        {user?.socialMedia?.linkedIn && (
          <a
            href={user.socialMedia.linkedIn}
            className="text-gray-400 flex items-center gap-2 transition-colors hover:text-teal-400"
          >
            <FiLinkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </a>
        )}
        {user?.socialMedia?.twitter && (
          <a
            href={user.socialMedia.twitter}
            className="text-gray-400 flex items-center gap-2 transition-colors hover:text-teal-400"
          >
            <FiTwitter className="h-5 w-5" />
            <span>Twitter</span>
          </a>
        )}
        {user?.socialMedia?.github && (
          <a
            href={user?.socialMedia?.github}
            className="text-gray-400 flex items-center gap-2 transition-colors hover:text-teal-400"
          >
            <FiGithub className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        )}
      </div>

      <a
        href={`mailto:${user.email}`}
        className="group flex items-center gap-2 rounded-lg border border-white/10 bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-white hover:from-teal-500 hover:to-emerald-500"
      >
        <FiMail className="transition-all group-hover:scale-105" />
        Contact
      </a>
    </div>
  );
};

export default SocialLinks;
