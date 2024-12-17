import React from 'react';
import LoginForm from '@components/authForms/LoginForm';
import GoogleButton from '@components/authForms/GoogleButton';
import { redirect } from 'next/navigation';
import { auth } from '@auth';

const LoginPage = async () => {
  const session = await auth();

  if (session && session.user && session.user.id) {
    redirect('/my-profile');
  }

  return (
    <div className="rounded-lg">
      <h1 className="mb-4 text-center text-3xl font-bold text-white">Sign in</h1>
      <GoogleButton />
      <LoginForm />
      <div className="mt-8 text-center text-sm text-white">
        <a href="/register" className="transition-colors hover:text-white/80">
          Don&apos;t have an account? <span className="font-bold underline">Sign up</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
