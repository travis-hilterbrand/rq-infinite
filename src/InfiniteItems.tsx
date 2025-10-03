import { useInfiniteQuery } from "@tanstack/react-query";

type Item = { id: number; name: string };
type PageData = {
  hasMore: boolean;
  items: Item[];
  total: number;
  page: number;
  pageSize: number;
};

const fetchItems = async ({ pageParam = 1 }): Promise<PageData> => {
  const res = await fetch(`/api/items?page=${pageParam}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const InfiniteItems = () => {
  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    enabled: true,
    queryKey: ["infinite-items"],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore === false) return undefined;
      return lastPage.page + 1;
    },
    retry: 1,
    staleTime: 5000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const items: Item[] = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div>
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        Load more
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
