import TransparentButton from "@components/common/buttons/TransparentButton";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

type SearchProps = {
  handleQueryChange: (query: string) => void;
  queryString: string;
  setQueryString: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ handleQueryChange, queryString, setQueryString }: SearchProps) => {
  const [localQuery, setLocalQuery] = useState(queryString || "");

  const executeSearch = useCallback(() => {
    handleQueryChange(localQuery);
    setQueryString(localQuery);
  }, [localQuery, handleQueryChange, setQueryString]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  useEffect(() => {
    setLocalQuery(queryString);
  }, [queryString]);

  return (
    <div className="md:mb-12 mb-8">
      <div className="flex gap-3">
        <div className="relative max-w-xl flex-1">
          <input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects..."
            className="placeholder:text-gray-500 w-full rounded-lg bg-[#161B22] md:px-4 md:py-3 px-2 py-2 pl-2 text-white outline-none ring-1 ring-white/10 transition-all duration-200 focus:ring-teal-500/50"
          />
        </div>
        <TransparentButton onClick={executeSearch}>
          <FiSearch />
        </TransparentButton>
      </div>
    </div>
  );
};

export default Search;
