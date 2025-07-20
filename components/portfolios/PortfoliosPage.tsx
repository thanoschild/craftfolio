"use client";

import React, { useEffect, useRef } from "react";
import { LuUsers } from "react-icons/lu";
import PortfolioTable from "./PortfolioTable";
import Loader from "../ui/Loader";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";
import PortfolioList from "./PortfolioList";
import { usePagination } from "@/contexts/PageContext";

type Portfolio = {
  id: string;
  name: string;
  timestamp: number;
};

export default function PortfoliosPage() {
  const {
    portfolios,
    loading,
    error,
    currentPage,
    hasNextPage,
    totalItems,
    fetchPortfolios,
    setCurrentPage,
  } = usePagination();

  const ITEMS_PER_PAGE = 10;
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchPortfolios(currentPage);
      hasFetchedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      fetchPortfolios(newPage); 
    }
  };

  const handleRetry = () => {
    fetchPortfolios(currentPage);
  };

  if (loading && portfolios.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-light-bg dark:bg-dark-bg min-h-[60vh]">
        <Loader message="Loading portfolios." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <LuUsers className="w-8 h-8 text-light-text dark:text-dark-text" />
            <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text">
              Live Portfolios
            </h1>
          </div>
          <p className="text-lg text-light-text-sub dark:text-dark-text-sub max-w-2xl">
            Explore professional portfolios created by other developers.
          </p>
        </div>

        {/* Content */}
        {portfolios.length === 0 && !loading ? (
          <EmptyState
            icon="user"
            title="No portfolios found"
            description="Be the first to create and publish your portfolio!"
          />
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block mb-8">
              <PortfolioTable portfolios={portfolios} />
            </div>

            {/* Mobile List View */}
            <div className="md:hidden mb-8">
              <PortfolioList portfolios={portfolios} />
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}

export type { Portfolio };
