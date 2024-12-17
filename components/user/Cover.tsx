'use client';

import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import EditProfileCoverForm from '../forms/EditProfileCoverForm';
import ModalButton from '../common/buttons/ModalButton';
import { ProfileComponentProps } from '@types';

const Cover = ({ user, isOwner }: ProfileComponentProps) => {
  return (
    <div className="relative h-48 w-full overflow-hidden lg:h-64">
      {user?.coverImage && (
        <img src={user?.coverImage} alt="Cover" className="h-full w-full object-cover" />
      )}
      {!user?.coverImage && (
        <svg width="100%" height="300">
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#065F46" stopOpacity="0.2" />
            </linearGradient>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
      {isOwner && (
        <ModalButton
          modalContent={<EditProfileCoverForm />}
          className="absolute right-2 top-2 rounded-lg px-4 py-2"
        >
          <FaPaintBrush />
          <span>Edit Cover</span>
        </ModalButton>
      )}
    </div>
  );
};

export default Cover;
