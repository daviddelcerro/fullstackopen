import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./context/NotificationContext";
import { BlogContextProvider } from "./context/BlogContext";
import { LoginContextProvider } from "./context/LoginContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <BlogContextProvider>
      <LoginContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </LoginContextProvider>
    </BlogContextProvider>
  </NotificationContextProvider>
);
