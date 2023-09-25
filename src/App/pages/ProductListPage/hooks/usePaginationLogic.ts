import { useState } from 'react';

export const usePaginationLogic = (initialPage: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (newPage: number, callback: (page: number) => void) => {
    setCurrentPage(newPage);
    callback(newPage);
  };

  return {
    currentPage,
    handlePageChange,
  };
};
