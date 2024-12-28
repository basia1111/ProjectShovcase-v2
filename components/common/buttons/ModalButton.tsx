"use client";

import { ModalContext } from "@contexts/ModalContext";
import React, { useContext, ReactElement, ReactNode } from "react";

type ModalButtonProps = {
  modalContent: ReactElement;
  children: ReactNode;
  className?: string;
};

const ModalButton = ({ modalContent, children, className }: ModalButtonProps) => {
  const { openModal } = useContext(ModalContext)!;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(modalContent);
      }}
      className={`text-gray-300 inline-flex items-center justify-center gap-2 rounded-full bg-[#161B22]/40 font-medium ring-1 ring-white/10 transition-all duration-200 hover:bg-[#1C2128] ${className}`}
    >
      {children}
    </button>
  );
};

export default ModalButton;
