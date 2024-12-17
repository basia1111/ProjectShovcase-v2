'use client';

import { Project } from '@types';
import React, { useContext, useState } from 'react';
import { PROJECT_STATUSES, PROJECT_CATEGORIES } from '@projectConstants';
import { ModalContext } from '@contexts/ModalContext';
import FormMessage from '@components/common/forms/FormMessage';
import Input from '@components/common/forms/Input';
import SectionTitle from '@components/common/forms/SectionTitle';
import FileInputLabel from '@components/common/forms/FileInputLabel';
import FileInput from '@components/common/forms/FileInput';
import SubmitButton from '@components/common/forms/SubmitButton';
import ProjectStatusInput from '@components/common/forms/ProjectStatusInput';

type CreateProjectFormType = {
  updateProjects?: (project: Project) => void;
};

const CreateProjectForm = ({ updateProjects }: CreateProjectFormType) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const { closeModal } = useContext(ModalContext)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedFile) {
      formData.append('cover', selectedFile);
    }
    try {
      setLoading(true);
      const response = await fetch('/api/project/create', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const newProject = data.newProject;
        if (updateProjects) updateProjects(newProject);
        setLoading(false);
        setMessage('');
        closeModal();
      } else {
        setMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(`Upload failed: ${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">Create Project</h2>
      </div>

      <FormMessage message={message} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <SectionTitle title="Project Information" />
          <Input name="title" placeholder="Project Title" />
          <textarea
            name="description"
            rows={6}
            placeholder="Write something about project..."
            className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <SectionTitle title="Category" />
          <select
            name="category"
            id="category"
            className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <SectionTitle title="Status" />

          <div className="flex flex-wrap gap-2 pb-4">
            {PROJECT_STATUSES.map((status) => (
              <ProjectStatusInput
                key={status.value}
                status={status}
                selectedRadio={selectedRadio}
                setSelectedRadio={setSelectedRadio}
              />
            ))}
          </div>

          <Input name="email" type="email" placeholder="Contact Email" />

          <div className="relative">
            {preview && (
              <div className="group relative mb-4">
                <img
                  src={preview}
                  alt="Project cover"
                  className="h-[300px] w-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <FileInputLabel selectedFile={selectedFile} inputName="cover" />
            <FileInput
              setSelectedFile={setSelectedFile}
              setPreviewImage={setPreviewImage}
              name="cover"
            />
          </div>
          <SubmitButton loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
