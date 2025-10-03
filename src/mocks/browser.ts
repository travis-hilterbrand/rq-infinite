import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

const PAGE_SIZE = 10;
const TOTAL_ITEMS = 50;

type Item = {
  id: number;
  name: string;
};
const items: Item[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

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
  })
);
