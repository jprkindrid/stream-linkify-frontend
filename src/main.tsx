import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app/App";
import "./index.css";
import { ThemeProvider } from "./providers/themeProvider";
import { AccentProvider } from "./providers/accentProviders";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AccentProvider>
                    <App />
                </AccentProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
