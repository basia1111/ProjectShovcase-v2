/* eslint-disable @next/next/no-img-element */
"use client";

import { Project } from "@types";
import React, { useContext, useState } from "react";
import { FiMail, FiExternalLink, FiGithub, FiBook } from "react-icons/fi";
import { PROJECT_STATUSES, PROJECT_CATEGORIES } from "@projectConstants";
import { ModalContext } from "@contexts/ModalContext";
import FormMessage from "@components/common/forms/FormMessage";
import Input from "@components/common/forms/Input";
import SectionTitle from "@components/common/forms/SectionTitle";
import FileInputLabel from "@components/common/forms/FileInputLabel";
import FileInput from "@components/common/forms/FileInput";
import SubmitButton from "@components/common/forms/SubmitButton";
import ProjectStatusInput from "@components/common/forms/ProjectStatusInput";
import RepeaterString from "@components/common/forms/RepeaterString";
import RepeaterObject from "@components/common/forms/RepeaterObject";

type EditProjectFormType = {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const EditProjectForm = ({ project, setProject }: EditProjectFormType) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string>(project?.status || PROJECT_STATUSES[0].value);
  const [featuresList, setFeaturesList] = useState<{ title: string; description: string }[]>(project?.keyFeatures || []);
  const [techStackList, setTechStackList] = useState<string[]>(project?.techStack || []);
  const { closeModal } = useContext(ModalContext)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("status", selectedRadio);

    if (selectedFile) {
      formData.append("cover", selectedFile);
    }
    if (techStackList) {
      formData.append("techStack", JSON.stringify(techStackList));
    }
    if (featuresList) {
      formData.append("keyFeatures", JSON.stringify(featuresList));
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/project/update/${project._id}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }
      setProject(data.project);
      setLoading(false);
      setMessage("");
      closeModal();
    } catch (error) {
      setMessage(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
      setLoading(false);
    }
  };

  if (!project) {
    return <div>No project data available</div>;
  }

  return (
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">Edit Project</h2>
      </div>

      <FormMessage message={message} />

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-4">
          <SectionTitle title="Project Information*" />
          <Input
            name="title"
            placeholder="Project Title"
            defaultValue={project.title}
          />
          <textarea
            name="description"
            rows={6}
            placeholder="Write something about project..."
            className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-3 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            defaultValue={project.description}
            required
          />
          <div className="flex gap-2 items-center">
            <FiMail className="text-gray-300 size-5" />
            <Input
              name="email"
              type="email"
              placeholder="Contact Email"
              defaultValue={project.email}
            />
          </div>
          <SectionTitle title="Project links" />
          <div className="flex gap-2 items-center">
            <FiGithub className="text-gray-300 size-5" />
            <Input
              name="gitHub"
              placeholder="Github link"
              defaultValue={project?.gitHub || ""}
            />
          </div>
          <div className="flex gap-2 items-center">
            <FiExternalLink className="text-gray-300 size-5" />
            <Input
              name="liveDemo"
              placeholder="Live demo link"
              defaultValue={project?.liveDemo || ""}
            />
          </div>
          <div className="flex gap-2 items-center">
            <FiBook className="text-gray-300 size-5" />
            <Input
              name="documentation"
              placeholder="Documentation link"
              defaultValue={project?.documentation || ""}
            />
          </div>

          <SectionTitle title="Tech stack*" />
          <RepeaterString
            repeaterList={techStackList}
            setRepeaterList={setTechStackList}
          />

          <SectionTitle title="Key features*" />
          <RepeaterObject
            repeaterList={featuresList}
            setRepeaterList={setFeaturesList}
          />

          <SectionTitle title="Category*" />
          <select
            name="category"
            id="category"
            className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-2 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            required
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option
                key={category.value}
                value={category.value}
                selected={project.category === category.value}
              >
                {category.label}
              </option>
            ))}
          </select>

          <SectionTitle title="Project status*" />
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

          <SectionTitle title="Project cover*" />
          <div className="relative">
            <div className="group relative mb-4">
              <img
                src={preview || project.cover}
                alt="Project cover"
                className="h-[300px] w-full object-cover transition-all duration-300 group-hover:scale-105"
              />
            </div>

            <FileInputLabel
              selectedFile={selectedFile}
              inputName="cover"
            />
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

export default EditProjectForm;
