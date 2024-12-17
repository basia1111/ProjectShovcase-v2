import { Project } from "@types";
import React from "react";

type PaginationProps = {
  handlePageChange: (page: number) => void;
  activePage: number;
  filteredProjects: Project[];
  itemsPerPage: number;
};
const Pagination = ({ handlePageChange, activePage, filteredProjects, itemsPerPage }: PaginationProps) => {
  const calculateTotalPages = () => {
    return Math.ceil(filteredProjects.length / itemsPerPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = calculateTotalPages();
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-8">
      {getPageNumbers().map((pageNum) => (
        <button
          onClick={() => handlePageChange(pageNum)}
          key={pageNum}
          className={`rounded-md border px-2 py-1 transition-all hover:text-emerald-300 ${
            pageNum === activePage ? "border-white/10 text-emerald-300" : "text-gray-200 border-transparent"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
