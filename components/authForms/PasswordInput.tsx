import React, { useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

const PasswordInput = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  return (
    <div className="text-md flex w-full items-center justify-center rounded-md border border-white/10 bg-[#1C2128]/50 text-white transition-all placeholder:text-white/70 focus:border-white/20 focus:bg-[#1C2128]/80 focus:outline-none focus:ring-2 focus:ring-white/10">
      <input
        type={isVisiblePassword ? 'text' : 'password'}
        name="password"
        id="password"
        className="text-md w-full rounded-md bg-transparent px-5 py-3 text-white placeholder:text-white/50 focus:border-transparent focus:outline-none focus:ring-0"
        placeholder="password"
      />
      {isVisiblePassword ? (
        <PiEye
          className="size-8 cursor-pointer pr-2 text-white/70 hover:text-white"
          onClick={() => setIsVisiblePassword(false)}
        />
      ) : (
        <PiEyeSlash
          className="size-8 cursor-pointer pr-2 text-white/70 hover:text-white"
          onClick={() => setIsVisiblePassword(true)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
