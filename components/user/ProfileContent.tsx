'use client';

import React, { useContext } from 'react';

import Cover from '@components/user/Cover';
import ProfileImage from '@components/user/ProfileImage';
import Username from '@components/user/Username';
import UserDetails from '@components/user/UserDetails';
import SocialLinks from '@components/user/SocialLinks';
import About from '@components/user/About';
import Projects from '@components/user/Projects';
import { User } from '@types';
import { UserContext } from '@contexts/UserContext';

type ProfileProps = {
  user: User;
  viewMode: 'private' | 'public';
};
const ProfileContent = ({ user: serverUser, viewMode }: ProfileProps) => {
  const { user: contextUser } = useContext(UserContext)!;

  const user = viewMode === 'private' ? contextUser || serverUser : serverUser;
  const isOwner = viewMode == 'private';

  return (
    <>
      <Cover user={user} isOwner={isOwner} />
      <div className="profile-content relative mx-auto flex max-w-7xl flex-col items-start px-6 pb-16 lg:-mt-[70px]">
        <div className="profile-header flex flex-col gap-6 lg:w-full lg:flex-row lg:items-end">
          <ProfileImage user={user} isOwner={isOwner} />
          <div>
            <Username user={user} isOwner={isOwner} />
            <UserDetails user={user} isOwner={isOwner} />
          </div>
        </div>
        <SocialLinks user={user} isOwner={isOwner} />
        <About user={user} isOwner={isOwner} />
        <Projects user={user} isOwner={isOwner} />
      </div>
    </>
  );
};

export default ProfileContent;
