import { useEffect } from "react";
import { initTheme } from "@/utils/theme";
import { placeholderResponse } from "@/utils/placeholder";

export default function App() {
    useEffect(() => {
        initTheme();
    }, []);

    return (
        <div className="dark:bg-neutral-850 flex h-screen w-full justify-center bg-neutral-50">
            <div className="my-24 max-w-2xl flex-col items-center justify-center border border-red-500">
                <h1 className="text-4xl font-bold">Stream Linkify</h1>
                <div>
                    {placeholderResponse.artistNames} - {}
                </div>
            </div>
        </div>
    );
}
