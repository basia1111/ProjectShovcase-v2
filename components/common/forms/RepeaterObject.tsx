import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

type RepeaterProps = {
  repeaterList: { title: string; description: string }[];
  setRepeaterList: React.Dispatch<React.SetStateAction<{ title: string; description: string }[]>>;
};

const RepeaterObject = ({ repeaterList, setRepeaterList }: RepeaterProps) => {
  const [newRepeater, setNewRepeater] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleDeleteItem = (index: number) => {
    setRepeaterList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    if (newRepeater.title.trim() && newRepeater.description.trim()) {
      setRepeaterList((prev) => [
        ...prev,

        {
          title: newRepeater.title.trim(),
          description: newRepeater.description.trim(),
        },
      ]);
      setNewRepeater({ title: "", description: "" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.metaKey) {
      handleAddItem();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {repeaterList.map((item, index) => (
          <div
            key={index}
            className="group rounded-lg  bg-[#1C2128]/5 px-3 py-2 ring-1 ring-gray-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteItem(index)}
                className="rounded-lg p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={newRepeater.title}
          onChange={(e) => setNewRepeater((prev) => ({ ...prev, title: e.target.value }))}
          onKeyPress={handleKeyPress}
          placeholder="Enter title..."
          className=" border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-2 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
        <div className="flex gap-2">
          <textarea
            value={newRepeater.description}
            onChange={(e) => setNewRepeater((prev) => ({ ...prev, description: e.target.value }))}
            onKeyPress={handleKeyPress}
            placeholder="Enter description..."
            rows={3}
            className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-2 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <button
            type="button"
            onClick={handleAddItem}
            disabled={!newRepeater.title.trim() || !newRepeater.description.trim()}
            className="rounded-lg bg-white p-2 text-gray-400 border-gray-200 ring-1 ring-gray-200 hover:text-emerald-500 hover:bg-teal-50 hover:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepeaterObject;
