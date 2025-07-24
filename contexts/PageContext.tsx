"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';

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

type CountResponse = {
  totalItems: number;
  success: boolean;
  error?: string;
};

type PaginationContextType = {
  portfolios: Portfolio[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasNextPage: boolean;
  totalItems: number;
  fetchPortfolios: (page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  resetPagination: () => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPageState] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalItems, setTotalItems] = useState<number | null>(null); // null means not fetched yet
  
  // useRef to store startKeys to avoid state update issues
  const startKeysRef = useRef<{ [page: number]: string }>({});
  const isFetchingRef = useRef(false);
  const isFetchingCountRef = useRef(false);

  const ITEMS_PER_PAGE = 10;

  // Fetch total count once
  const fetchTotalCount = useCallback(async () => {
    if (isFetchingCountRef.current || totalItems !== null) {
      return; 
    }

    try {
      isFetchingCountRef.current = true;
      const response = await fetch('/api/portfolio/public/count');
      
      if (!response.ok) {
        throw new Error('Failed to fetch total count');
      }

      const data: CountResponse = await response.json();
      
      if (data.success) {
        setTotalItems(data.totalItems);
        console.log(`Context: Total count fetched: ${data.totalItems}`);
      } else {
        console.error('Context: Failed to get total count:', data.error);
        setTotalItems(0);
      }

    } catch (err) {
      console.error('Context: Error fetching total count:', err);
      setTotalItems(0);
    } finally {
      isFetchingCountRef.current = false;
    }
  }, [totalItems]);

  const fetchPortfolios = useCallback(async (page: number = 1) => {
    if (isFetchingRef.current) {
      return;
    }

    // Fetch total count if not already fetched
    if (totalItems === null) {
      fetchTotalCount();
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      const currentStartKeys = startKeysRef.current;
      if (page > 1 && currentStartKeys[page]) {
        params.append("startKey", currentStartKeys[page]);
      }

      const response = await fetch(`/api/portfolio/public/live?${params}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch portfolios");
      }

      const data: ApiResponse = await response.json();
      
      setPortfolios(data.items);
      setHasNextPage(data.hasNextPage);
      setCurrentPageState(page);

      // Store the startKey for the next page in ref
      if (data.nextStartKey) {
        startKeysRef.current = {
          ...startKeysRef.current,
          [page + 1]: data.nextStartKey
        };
      }

    } catch (err) {
      console.error("Context: Error fetching portfolios:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load portfolios. Please try again."
      );
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [ITEMS_PER_PAGE, totalItems, fetchTotalCount]);

  const setCurrentPage = useCallback((page: number) => {
    if (page >= 1 && !isFetchingRef.current) {
      setCurrentPageState(page);
    }
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPageState(1);
    startKeysRef.current = {}; 
    setPortfolios([]);
    setHasNextPage(false);
    setTotalItems(null);
    setError(null);
    isFetchingRef.current = false;
    isFetchingCountRef.current = false;
  }, []);

  const value: PaginationContextType = {
    portfolios,
    loading,
    error,
    currentPage,
    hasNextPage,
    totalItems: totalItems || 0, 
    fetchPortfolios,
    setCurrentPage,
    resetPagination,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
}

export type { Portfolio, ApiResponse };