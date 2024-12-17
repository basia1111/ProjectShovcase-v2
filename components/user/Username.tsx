'use client';

import React from 'react';
import ModalButton from '@components/common/buttons/ModalButton';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserDataForm from '../forms/EditUserDataForm';
import { ProfileComponentProps } from '@types';

const Username = ({ user, isOwner }: ProfileComponentProps) => {
  return (
    <div className="relative flex gap-2">
      <h1 className="text-2xl font-bold text-white lg:text-3xl">{user?.name}</h1>
      {isOwner && (
        <ModalButton modalContent={<EditUserDataForm />} className="h-[35px] w-[35px] px-0 py-0">
          <FaPencilAlt size="12" />
        </ModalButton>
      )}
    </div>
  );
};

export default Username;
