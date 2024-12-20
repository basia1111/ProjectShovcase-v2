import Link from "next/link";
import React from "react";

const LoginModalContent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold ">Login Required</h2>
      <p className="text-gray-600">Please log in to your account or register. It only takes a moment!</p>
      <div className="flex mt-3 gap-2 items-center-jystify-center">
        <Link
          className="flex items-center rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-white hover:from-teal-500 hover:to-emerald-500"
          href="/register"
        >
          Sign up
        </Link>
        <Link
          className="inline-flex items-center   cursor-pointer justify-center gap-2 rounded-lg px-4 py-2 font-medium bg-[#1C2128]/50 transition-all duration-300 group  text-white ring-1 ring-[#1C2128]/20 hover:bg-[#1C2128]/20 "
          href="/login"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default LoginModalContent;
