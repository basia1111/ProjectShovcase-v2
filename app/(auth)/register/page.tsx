import React from 'react';
import Link from 'next/link';
import RegisterForm from '@components/authForms/RegisterForm';
import { auth } from '@auth';
import { redirect } from 'next/navigation';
import GoogleButton from '@components/authForms/GoogleButton';

const page = async () => {
  const session = await auth();

  if (session && session.user && session.user.id) {
    redirect('/my-profile');
  }

  return (
    <div className="rounded-lg">
      <h1 className="mb-4 text-center text-3xl font-bold text-white">Sign up</h1>
      <GoogleButton />
      <RegisterForm />
      <div className="mt-8 text-center text-sm text-white">
        <Link href="/login" className="transition-colors hover:text-white/80">
          Already have an account? <span className="font-bold underline">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
