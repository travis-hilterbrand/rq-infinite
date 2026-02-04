import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { PagedItems } from "./PagedItems";
import { InfiniteItems } from "./InfiniteItems";

const queryClient = new QueryClient();

export default function App() {
  const [showOnlyReady, setShowOnlyReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <h2>
        Fetch examples
        <label style={{ fontSize: "12px", marginLeft: 8 }}>
          <input
            type="checkbox"
            checked={showOnlyReady}
            onChange={() => setShowOnlyReady((prev) => !prev)}
          />
          Show only ready
        </label>
      </h2>
      <PagedItems showOnlyReady={showOnlyReady} />
      <hr />
      <InfiniteItems showOnlyReady={showOnlyReady} />
    </QueryClientProvider>
  );
}
