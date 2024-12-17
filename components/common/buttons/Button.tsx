import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className: string;
};
const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
