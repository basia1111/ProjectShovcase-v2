import ModalButton from '@components/common/buttons/ModalButton';
import React from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const Search = () => {
  return (
    <div className="mb-12">
      <div className="flex gap-3">
        <div className="relative max-w-xl flex-1">
          <FiSearch className="text-gray-500 absolute left-4 top-3.5 h-5 w-5" />
          <input
            placeholder="Search projects..."
            className="placeholder:text-gray-500 w-full rounded-lg bg-[#161B22] px-4 py-3 pl-12 text-white outline-none ring-1 ring-white/10 transition-all duration-200 focus:ring-teal-500/50"
          />
        </div>
        <ModalButton
          modalContent={<p>modal content</p>}
          className="text-gray-300 rounded-lg bg-[#161B22] px-4 py-2 ring-1 ring-white/10 hover:bg-[#1C2128]"
        >
          <FiFilter />
          Filters
        </ModalButton>
      </div>
    </div>
  );
};

export default Search;
