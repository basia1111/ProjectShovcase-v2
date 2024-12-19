import React from "react";
import { BiSortAlt2 } from "react-icons/bi";

type SelectFilterProps = {
  handleSortingChange: (sort: null | "asc" | "desc") => void;
  sorting: null | "asc" | "desc";
};
const SelectFilter = ({ handleSortingChange, sorting }: SelectFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "none") {
      handleSortingChange(null);
    } else {
      handleSortingChange(e.target.value as "asc" | "desc");
    }
  };
  return (
    <div className="relative inline-block">
      <select
        onChange={handleChange}
        value={sorting ? sorting : "none"}
        className="text-gray-300 bg-[#161B22] ring-1 ring-white/10  rounded-lg pl-8 md:px-4 md:py-3  px-2 py-2 font-medium transition-all duration-200 hover:bg-[#1C2128] focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option
          value="none"
          className="bg-[#161B22] text-gray-300"
        >
          Default order
        </option>
        <option
          value="desc"
          className="bg-[#161B22] text-gray-300"
        >
          Newest first
        </option>
        <option
          value="asc"
          className="bg-[#161B22] text-gray-300"
        >
          Oldest first
        </option>
      </select>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <BiSortAlt2 />
      </div>
    </div>
  );
};

export default SelectFilter;
