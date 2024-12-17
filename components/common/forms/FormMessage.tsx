import React from 'react';

const FormMessage = ({ message }: { message: string | null }) => {
  return (
    <div>
      {message && (
        <div className="mb-4 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
          <span className="mr-2">⚠️</span>
          {message}
        </div>
      )}
    </div>
  );
};

export default FormMessage;
