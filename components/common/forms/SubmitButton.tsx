import React from 'react';
import { ClipLoader } from 'react-spinners';

type SubmitButtonProps = {
  loading: boolean;
  className?: string;
};

const SubmitButton = ({ loading, className }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-3.5 text-white transition-all duration-300 hover:from-teal-500 hover:to-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <ClipLoader size={20} color="#ffffff" />
      ) : (
        <span className="relative font-medium">Save</span>
      )}
    </button>
  );
};

export default SubmitButton;
