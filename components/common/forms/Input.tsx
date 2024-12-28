import React from "react";

type InputProps = {
  placeholder: string;
  name: string;
  type?: string | null;
  defaultValue?: string | null;
  hidden?: boolean;
};

const Input = ({ defaultValue, name, type, placeholder, hidden }: InputProps) => {
  return (
    <input
      type={type || "text"}
      name={name}
      id={name}
      placeholder={placeholder}
      defaultValue={defaultValue || ""}
      className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-2 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      {...(hidden ? { hidden: true } : {})}
    />
  );
};

export default Input;
