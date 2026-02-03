import { createSignal } from 'solid-js';

export interface PaginationState {
  page: () => number;
  totalPages: () => number;
  hasNextPage: () => boolean;
  hasPrevPage: () => boolean;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

export function usePagination(initialPage = 1): PaginationState {
  const [page, setPage] = createSignal(initialPage);
  const [totalPages, setTotalPages] = createSignal(1);

  return {
    page,
    totalPages,
    hasNextPage: () => page() < totalPages(),
    hasPrevPage: () => page() > 1,
    nextPage: () => {
      if (page() < totalPages()) {
        setPage((p) => p + 1);
      }
    },
    prevPage: () => {
      if (page() > 1) {
        setPage((p) => Math.max(1, p - 1));
      }
    },
    goToPage: (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages()) {
        setPage(newPage);
      }
    },
    setTotalPages,
  };
}
