import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`transition-all duration-200 inline-flex  gap-2 px-4 py-2 font-medium  text-gray-300 bg-[#161B22] ring-1 ring-white/10 hover:bg-[#1C2128] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
