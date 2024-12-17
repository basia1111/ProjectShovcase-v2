'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { UserContext } from '@contexts/UserContext';
import { ModalContext } from '@contexts/ModalContext';
import { FaCheck } from 'react-icons/fa';
import FormMessage from '@components/common/forms/FormMessage';
import FileInput from '@components/common/forms/FileInput';
import FileInputLabel from '@components/common/forms/FileInputLabel';
import SubmitFileButton from '@components/common/forms/SubmitFileButton';
import SectionTitle from '@components/common/forms/SectionTitle';

const EditProfileImageForm = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { closeModal } = useContext(ModalContext)!;

  const { update } = useSession();
  const { user, updateUser } = useContext(UserContext)!;

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!selectedFile) {
      setMessage('Please select an image');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/user/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        await update({ image: data.image });
        await fetch('/api/auth/session');
        setLoading(false);
        setMessage('');
        setPreviewImage(null);
        closeModal();
      } else {
        setMessage(data.message);
        setLoading(false);
      }
    } catch {
      setMessage('Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <SectionTitle title="Edit profile image" />
      <div className="flex flex-col items-center space-y-6">
        <div className="relative h-[160px] w-[160px] rounded-md border-4 border-white bg-white shadow-lg transition-all duration-300">
          <Image
            src={previewImage || user?.image || '/images/avatar.png'}
            alt="profile picture"
            width={160}
            height={160}
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            priority
          />
          {selectedFile && (
            <div className="absolute -right-3 -top-3 rounded-full bg-teal-600 p-2 text-white shadow-md">
              <FaCheck size={12} />
            </div>
          )}
        </div>
        <FormMessage message={message} />
        <form
          onSubmit={handleUpload}
          className="bg-black/4 mt-4 w-full space-y-4 rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <FileInputLabel selectedFile={selectedFile} inputName="image" className="w-full" />
            <FileInput
              name="image"
              setSelectedFile={setSelectedFile}
              setPreviewImage={setPreviewImage}
            />
            <SubmitFileButton selectedFile={selectedFile} loading={loading} className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileImageForm;
