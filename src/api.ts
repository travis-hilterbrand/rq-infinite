import type { PageData } from "./types";

export const fetchItems = async (
  page: number,
  showOnlyReady: boolean,
): Promise<PageData> => {
  const res = await fetch(
    `/api/items?page=${page}&showOnlyReady=${showOnlyReady}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
