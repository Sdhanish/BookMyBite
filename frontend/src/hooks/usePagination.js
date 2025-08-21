import { useState, useMemo, useEffect } from "react";

export function usePagination(data = [], itemsPerPage = 6) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  // Update total pages when data or pageSize changes
  const totalPages = Math.ceil(data.length / pageSize);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize]);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
    prevPage,
    nextPage,
    pageSize,
    setPageSize,
  };
}
