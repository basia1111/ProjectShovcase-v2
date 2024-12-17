import React from 'react';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import Profile from '@components/user/Profile';

export default async function ProfilePagePrivate() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect('/login?callbackUrl=/my-profile');
  }

  return <Profile userId={session.user.id} viewMode="private" />;
}
