import { useInfiniteQuery } from "@tanstack/react-query";
import type { Item } from "./types";
import { fetchItems } from "./api";

export const InfiniteItems = ({
  showOnlyReady,
}: {
  showOnlyReady: boolean;
}) => {
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
    queryKey: ["infinite-items", showOnlyReady],
    queryFn: ({ pageParam }) => fetchItems(pageParam, showOnlyReady),
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
          <li key={item.id}>{item.name + " " + item.ready}</li>
        ))}
      </ul>
    </div>
  );
};
