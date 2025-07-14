"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { LuUsers } from 'react-icons/lu';
import PortfolioTable from './PortfolioTable';
import Loader from '../ui/Loader';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import PortfolioList from './PortfolioList';

type Portfolio = {
  id: string;
  name: string;
  timestamp: number;
};

type ApiResponse = {
  items: Portfolio[];
  nextStartKey: string | null;
  currentPage: number;
  hasNextPage: boolean;
  totalItems: number;
};

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [startKeys, setStartKeys] = useState<{ [page: number]: string }>({});
  const [totalItems, setTotalItems] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const fetchPortfolios = useCallback(async (page: number = 1) => {
  try {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: ITEMS_PER_PAGE.toString(),
    });

    if (page > 1 && startKeys[page]) {
      params.append("startKey", startKeys[page]);
    }

    const response = await fetch(`/api/portfolio/public/live?${params}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch portfolios");
    }

    const data: ApiResponse = await response.json();

    setPortfolios(data.items);
    setHasNextPage(data.hasNextPage);
    setTotalItems(data.totalItems);

    if (data.nextStartKey) {
      setStartKeys((prev) => ({
        ...prev,
        [page + 1]: data.nextStartKey!,
      }));
    }
  } catch (err) {
    console.error("Error fetching portfolios:", err);
    setError(
      err instanceof Error
        ? err.message
        : "Failed to load portfolios. Please try again."
    );
  } finally {
    setLoading(false);
  }
}, [ITEMS_PER_PAGE, startKeys]); 

  useEffect(() => {
    fetchPortfolios(currentPage);
  }, [currentPage, fetchPortfolios]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && (newPage <= currentPage || hasNextPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleRetry = () => {
    fetchPortfolios(currentPage);
  };

  if (loading && portfolios.length === 0) {
    return (
       <Loader message="Loading portfolios." size="lg" />
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