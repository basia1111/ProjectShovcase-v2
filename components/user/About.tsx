'use client';

import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import EditUserAboutForm from '../forms/EditUserAboutForm';
import ModalButton from '@components/common/buttons/ModalButton';
import { ProfileComponentProps } from '@types';

const About = ({ user, isOwner }: ProfileComponentProps) => {
  return (
    <div className="mt-8 w-full">
      <div className="relative flex gap-2">
        <h3 className="text-xl font-semibold text-white">About</h3>
        {isOwner && (
          <ModalButton
            modalContent={<EditUserAboutForm />}
            className="h-[30px] w-[30px] p-0 px-0 py-0"
          >
            <FaPencilAlt size="12" />
          </ModalButton>
        )}
      </div>
      <p className="text-gray-400 mt-2 leading-relaxed">{user?.about}</p>
    </div>
  );
};

export default About;
