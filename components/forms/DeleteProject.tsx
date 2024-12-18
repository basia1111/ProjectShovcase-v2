import React, { useContext, useState } from "react";
import { Project } from "@types";
import { FaRegCircleXmark } from "react-icons/fa6";
import { ModalContext } from "@contexts/ModalContext";
import FormMessage from "@components/common/forms/FormMessage";
import { ClipLoader } from "react-spinners";

type DeleteProjectProps = {
  setProjectsList: React.Dispatch<React.SetStateAction<Project[] | null>>;
  id: string;
  setProjectsNumber: React.Dispatch<React.SetStateAction<number>>;
};

const DeleteProject = ({ id, setProjectsList, setProjectsNumber }: DeleteProjectProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { closeModal } = useContext(ModalContext)!;

  const handleClick = async () => {
    setMessage(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/project/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.error(setProjectsList);
      if (response.ok) {
        setProjectsList((prev) => {
          if (!prev) return null;
          return prev.filter((project) => project._id != id);
        });
        setProjectsNumber((prev) => prev - 1);
        closeModal();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(`Project could not be deleted: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md">
      <FaRegCircleXmark
        size={50}
        className="text-red-600"
      />
      <FormMessage message={message} />
      <h2 className="text-gray-800 text-xl font-bold">Confirm Deletion</h2>
      <p className="text-gray-600 text-center">Are you sure you want to delete this project? This action cannot be undone.</p>
      <div className="flex w-full justify-center gap-3">
        <button
          onClick={handleClick}
          disabled={loading}
          className="rounded-md bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700 disabled:bg-red-400"
        >
          {loading ? (
            <ClipLoader
              size={20}
              color="#ffffff"
            />
          ) : (
            "Delete"
          )}
        </button>
        <button
          onClick={() => closeModal()}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md border bg-white px-6 py-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProject;
