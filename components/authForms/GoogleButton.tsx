'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const GoogleButton = () => {
  return (
    <>
      <button
        onClick={() => signIn('google')}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-white/10 bg-black/50 px-2 py-3 text-white transition-all hover:border-white/20 hover:bg-black/70"
      >
        <FaGoogle className="text-white/90" />
        Continue with Google
      </button>
      <p className="w-full p-4 text-center text-sm text-white/70">or</p>
    </>
  );
};

export default GoogleButton;
