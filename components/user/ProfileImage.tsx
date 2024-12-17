'use client';

import React from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import EditProfileImageForm from '../forms/EditProfileImageForm';
import ModalButton from '@components/common/buttons/ModalButton';
import { ProfileComponentProps } from '@types';

const ProfileImage = ({ user, isOwner }: ProfileComponentProps) => {
  return (
    <div className="relative -mt-12 h-28 w-28 overflow-hidden rounded-xl border-4 border-[#0D1117]/20 lg:h-36 lg:w-36">
      <Image
        src={user?.image || '/images/avatar.png'}
        alt="profile picture"
        width={160}
        height={160}
        className="h-full w-full object-cover"
        priority
      />
      {isOwner && (
        <ModalButton
          modalContent={<EditProfileImageForm />}
          className="absolute bottom-0 w-full rounded-b-sm rounded-t-none py-2"
        >
          <FaCamera className="size-4 text-white" />
        </ModalButton>
      )}
    </div>
  );
};

export default ProfileImage;
