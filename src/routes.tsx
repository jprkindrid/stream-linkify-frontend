import { createRootRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import { useEffect } from "react";
import { initTheme } from "./utils/theme";

const rootRoute = createRootRoute({
    component: function Root() {
        useEffect(() => {
            initTheme();
        }, []);
        return <App />;
    },
});

export const router = createRouter({ routeTree: rootRoute });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
