import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/shreeramk" />} />
        <Route path="/:user_name" element={<Home />} />
        <Route path="/shreeramk" element={<Home />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
