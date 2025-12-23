import { useEffect } from "react";
import { initTheme } from "./utils/theme";

export default function App() {
    useEffect(() => {
        initTheme();
    }, []);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white">
            <h1>Stream Linkify</h1>
        </div>
    );
}
