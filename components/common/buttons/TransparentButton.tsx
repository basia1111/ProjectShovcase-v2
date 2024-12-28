import React, { ReactNode } from "react";

type TransparentButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};
const TransparentButton = ({ children, className = "", onClick, ...props }: TransparentButtonProps) => (
  <div
    className={`inline-flex items-center   cursor-pointer justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 group bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10 ${className}`}
    {...props}
    onClick={onClick}
  >
    {children}
  </div>
);
export default TransparentButton;
