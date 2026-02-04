import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PageData } from "./types";
import { fetchItems } from "./api";

export const PagedItems = ({ showOnlyReady }: { showOnlyReady: boolean }) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useQuery<PageData, Error>({
    queryKey: ["paged-items", page, showOnlyReady],
    queryFn: () => fetchItems(page, showOnlyReady),
    placeholderData: keepPreviousData,
    retry: 1,
    staleTime: 5000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {data?.items?.map((item) => (
          <li key={item.id}>{item.name + " " + item.ready}</li>
        ))}
      </ul>
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span> Page {data?.page ?? page} </span>
      <button
        onClick={() =>
          setPage((p) => (data && data.items && data.items.length ? p + 1 : p))
        }
        disabled={
          !data || !data.items || data.items.length < (data.pageSize ?? 10)
        }
      >
        Next
      </button>
    </div>
  );
};
