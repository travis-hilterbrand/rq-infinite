import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import type { Item } from "../types";

const PAGE_SIZE = 10;
const TOTAL_ITEMS = 50;

const allItems: Item[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  ready: Boolean(i % 3),
}));

const getParamBool = (param: string | null): boolean => {
  if (param) {
    return param === "true";
  }
  return false;
};
const getParamInt = (param: string | null): number => {
  if (param) {
    return parseInt(param);
  }
  return 0;
};

export const worker = setupWorker(
  http.get("/api/items", async ({ request }) => {
    const url = new URL(request.url);
    const page: number = getParamInt(url.searchParams.get("page"));
    const showOnlyReady: boolean = getParamBool(
      url.searchParams.get("showOnlyReady"),
    );
    const items = showOnlyReady
      ? allItems.filter((item) => item.ready)
      : allItems;
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pagedItems = items.slice(start, end);
    return HttpResponse.json({
      items: pagedItems,
      total: TOTAL_ITEMS,
      page,
      pageSize: PAGE_SIZE,
      hasMore: end >= TOTAL_ITEMS ? false : true,
    });
  }),
);
