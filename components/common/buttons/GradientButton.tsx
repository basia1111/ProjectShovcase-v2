import React, { ReactNode } from "react";

type GradientButtonProps = {
  children: ReactNode;
  className?: string;
};
const GradientButton = ({ children, className = "", ...props }: GradientButtonProps) => (
  <div
    className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 group bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500 ${className}`}
    {...props}
  >
    {children}
  </div>
);
export default GradientButton;
