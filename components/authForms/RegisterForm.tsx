"use client";

import React, { useActionState } from "react";
import { register } from "@actions/register";
import PasswordInput from "./PasswordInput";
import Input from "./Input";

const RegisterForm = () => {
  const [message, formAction, isPending] = useActionState(register, null);
  return (
    <>
      <div className="">
        {isPending ? <div className="text-sm text-white">Loading...</div> : ""}
        {message && message === "success" ? (
          <div className="mb-6 w-full rounded-md border border-white/20 text-sm p-2 bg-emerald-200/10">
            <p className="text-emerald-400">
              Your account has been registered. <br />
              <a
                href="/login"
                className="text-emerald-300 underline hover:text-emerald-200"
              >
                login here
              </a>
            </p>
          </div>
        ) : message ? (
          <div className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
            {message}
          </div>
        ) : (
          ""
        )}
      </div>

      <form action={formAction}>
        <Input type="text" name="name" />
        <Input type="email" name="email" />
        <PasswordInput />
        <button
          type="submit"
          className="mt-4 w-full rounded-md border border-white/10 bg-black/50 px-6 py-3 text-base text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/70"
        >
          Create account
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
