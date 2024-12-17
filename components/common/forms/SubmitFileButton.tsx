'use client';

import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

type SubmitFileButtonProps = {
  selectedFile: File | null;
  loading: boolean;
  className?: string;
};

const SubmitFileButton = ({ selectedFile, loading, className }: SubmitFileButtonProps) => {
  return (
    <button
      type="submit"
      disabled={!selectedFile || loading}
      className={`group relative overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-3 text-white transition-all duration-300 hover:from-teal-500 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <ClipLoader size={20} color="#ffffff" />
      ) : (
        <span className="relative flex items-center justify-center gap-2 font-medium">
          <FaCloudUploadAlt className="text-lg" />
          Upload Image
        </span>
      )}
    </button>
  );
};

export default SubmitFileButton;
