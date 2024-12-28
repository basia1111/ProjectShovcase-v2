/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { ModalContext } from "@contexts/ModalContext";
import { UserContext } from "@contexts/UserContext";
import FileInputLabel from "@components/common/forms/FileInputLabel";
import FormMessage from "@components/common/forms/FormMessage";
import SubmitFileButton from "@components/common/forms/SubmitFileButton";
import FileInput from "@components/common/forms/FileInput";
import SectionTitle from "@components/common/forms/SectionTitle";

const EditProfileCoverForm = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { user, updateUser } = useContext(UserContext)!;
  const { closeModal } = useContext(ModalContext)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!selectedFile) {
      setMessage("Please select an image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("cover", selectedFile);

    try {
      const response = await fetch("/api/user/upload/cover", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage(null);
        updateUser(data.user);
        closeModal();
      } else {
        setMessage(data.message);
        setLoading(false);
      }
    } catch {
      setMessage("Internal server error");
    }
  };

  return (
    <div className="group relative pb-[20px]">
      <SectionTitle title="Edit profile cover image" />
      <div className="relative mt-4 h-44 w-[95%] rounded-2xl bg-white p-4 md:h-60">
        <img
          src={previewImage || user?.coverImage || "/images/cover-placeholder.png"}
          className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
          alt="Cover"
        />
        {selectedFile && (
          <div className="absolute -right-3 -top-3 rounded-full bg-teal-600 p-2 text-white shadow-md">
            <FaCheck size={12} />
          </div>
        )}
      </div>
      <FormMessage message={message} />
      <form
        onSubmit={handleSubmit}
        className="bg-black/4 mt-4 space-y-4 rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-4">
          <FileInputLabel
            selectedFile={selectedFile}
            inputName="cover"
            className="w-full"
          />
          <FileInput
            setSelectedFile={setSelectedFile}
            setPreviewImage={setPreviewImage}
            name="cover"
          />
          <SubmitFileButton
            selectedFile={selectedFile}
            loading={loading}
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfileCoverForm;
