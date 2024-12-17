import React from 'react';
import { FaImage } from 'react-icons/fa';

type FileInputLabelProps = {
  selectedFile: File | null;
  inputName: string;
  className?: string;
};
const FileInputLabel = ({ selectedFile, inputName, className }: FileInputLabelProps) => {
  return (
    <label
      htmlFor={inputName}
      className={`border-gray-200 bg-gray-50 hover:bg-gray-100 flex flex-grow cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-all duration-300 hover:border-teal-500/20 ${className}`}
    >
      <div className="w-12 rounded-full bg-teal-500/10 p-3 transition-all duration-300 group-hover:bg-teal-500/20">
        <FaImage className="h-6 w-6 text-teal-500" />
      </div>
      <div className="space-y-1">
        <p className="text-gray-700 text-sm font-medium">
          {selectedFile ? selectedFile.name : 'Click to upload file'}
        </p>
        <p className="text-gray-500 text-xs">SVG, PNG, JPG or GIF (max. 2MB)</p>
      </div>
    </label>
  );
};

export default FileInputLabel;
