import React, { SetStateAction } from 'react';

type FileInputProps = {
  setPreviewImage: React.Dispatch<SetStateAction<string | null>>;
  setSelectedFile: React.Dispatch<SetStateAction<File | null>>;
  name: string;
};

const FileInput = ({ setSelectedFile, setPreviewImage, name }: FileInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  return (
    <input
      type="file"
      name={name}
      id={name}
      className="hidden"
      onChange={handleChange}
      accept="image/*"
    />
  );
};

export default FileInput;
