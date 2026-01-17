import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app/App";
import "./index.css";
import { ThemeProvider } from "./providers/themeProvider";
import { AccentProvider } from "./providers/accentProviders";
import { API_URL } from "./config/environment";

const queryClient = new QueryClient();

setTimeout(() => {
    fetch(`${API_URL}/health`).catch(() => {
        console.log("Wake ping unsuccessful");
    });
}, 100);

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
