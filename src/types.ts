export type Item = {
  id: number;
  name: string;
  ready: boolean;
};

export type PageData = {
  hasMore: boolean;
  items: Item[];
  total: number;
  page: number;
  pageSize: number;
};
