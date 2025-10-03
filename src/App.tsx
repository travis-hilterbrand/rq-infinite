import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PagedItems } from "./PagedItems";
import { InfiniteItems } from "./InfiniteItems";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h2>Fetch examples</h2>
      <PagedItems />
      <hr />
      <InfiniteItems />
    </QueryClientProvider>
  );
}
