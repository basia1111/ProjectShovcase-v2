'use client';

import React, { useActionState } from 'react';
import { signIn } from 'next-auth/react';
import PasswordInput from './PasswordInput';
import Input from './Input';

const LoginForm = () => {
  const [message, formAction, isPending] = useActionState(
    async (_: string | null, formData: FormData) => {
      try {
        const result = await signIn('credentials', {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          callbackUrl: '/my-profile',
          redirect: false,
        });

        if (result?.error) {
          return 'Invalid credentials';
        } else {
          window.location.href = '/my-profile';
        }

        return null;
      } catch {
        return 'An unexpected error occurred';
      }
    },
    null,
  );

  return (
    <>
      {isPending ? (
        <div className="text-sm text-white">Loading...</div>
      ) : (
        message && (
          <div className="mb-4 w-full rounded-md border-[1px] border-red-500 bg-red-100/10 px-2 py-1 text-sm text-red-400">
            {message}
          </div>
        )
      )}
      <form action={formAction} className="space-y-4">
        <Input type="email" name="email" />
        <PasswordInput />
        <button
          type="submit"
          className="w-full rounded-md border border-white/10 bg-black/50 px-6 py-3 text-base text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/70"
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
