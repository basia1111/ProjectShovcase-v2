import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

type RepeaterProps = {
  repeaterList: string[];
  setRepeaterList: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
};

const RepeaterString = ({ repeaterList, setRepeaterList, placeholder = "Add new item..." }: RepeaterProps) => {
  const [newRepeater, setNewRepeater] = useState<string>("");

  const handleDeleteItem = (index: number) => {
    setRepeaterList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    if (newRepeater.trim()) {
      setRepeaterList((prev) => [...prev, newRepeater.trim()]);
      setNewRepeater("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {repeaterList.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-[#1C2128]/5 rounded-full px-3 py-1.5 ring-1 ring-gray-200"
          >
            <span className="text-sm text-gray-700">{item}</span>
            <button
              type="button"
              onClick={() => handleDeleteItem(index)}
              className="ml-1.5 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FiX className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newRepeater}
            onChange={(e) => setNewRepeater(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="border-gray-200 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 w-full rounded-lg border bg-white px-4 py-2 transition-all duration-200 hover:border-teal-500/20 focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <button
            type="button"
            onClick={handleAddItem}
            disabled={!newRepeater.trim()}
            className="rounded-lg bg-white p-2 text-gray-400 border-gray-200 ring-1 ring-gray-200 hover:text-emerald-500 hover:bg-teal-50 hover:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepeaterString;
