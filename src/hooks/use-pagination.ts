import { useState } from "react";
import { useRouter } from "next/navigation";

export function usePagination(initialPage: number, initialPageSize: number) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const router = useRouter();

  const updateUrl = (newPage: number, newPageSize: number) => {
    router.push(`/dashboard/pokemon?page=${newPage}&pageSize=${newPageSize}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl(newPage, pageSize);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setPageSize(size);
    setPage(1);
    updateUrl(1, size);
  };

  return {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
}
