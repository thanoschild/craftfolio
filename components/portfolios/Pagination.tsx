import React from 'react';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Loader from '../ui/Loader';

type Props = {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  loading?: boolean;
};

export default function Pagination({ 
  // currentPage, 
  // hasNextPage, 
  // onPageChange, 
  totalItems,
  // itemsPerPage,
  loading = false 
}: Props) {
  // const startItem = (currentPage - 1) * itemsPerPage + 1;
  // const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-light-text-sub dark:text-dark-text-sub">
          Showing {totalItems} portfolios
        </div>
        
        {/* <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-2 px-3 py-2 bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-lg text-light-text dark:text-dark-text hover:border-light-text dark:hover:border-dark-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-2 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg rounded-lg font-medium text-sm min-w-[40px] text-center">
              {currentPage}
            </span>
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage || loading}
            className="flex items-center gap-2 px-3 py-2 bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-lg text-light-text dark:text-dark-text hover:border-light-text dark:hover:border-dark-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div> */}
      </div>

      {/* Loading indicator for pagination */}
      {loading && (
        <div className="flex justify-center py-4">
          <Loader message="Loading." size="sm" />
        </div>
      )}
    </div>
  );
}