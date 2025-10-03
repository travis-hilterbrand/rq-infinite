import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Item = { id: number; name: string };
type PageData = {
  items: Item[];
  total: number;
  page: number;
  pageSize: number;
};

const fetchItems = async (page: number): Promise<PageData> => {
  const res = await fetch(`/api/items?page=${page}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const InfiniteItems = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useQuery<PageData, Error>({
    queryKey: ["infinite-items", page],
    queryFn: () => fetchItems(page),
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
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage((p) => Math.max(1, p + 1))}>
        Load more
      </button>
      <span> Page {data?.page ?? page} </span>
    </div>
  );
};
