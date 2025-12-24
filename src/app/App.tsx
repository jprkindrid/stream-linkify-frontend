import { useEffect } from "react";
import { initTheme } from "@/utils/theme";
import { placeholderResponse } from "@/utils/placeholder";
import StreamingLinks from "@/components/sections/StreamingLinks";

export default function App() {
    useEffect(() => {
        initTheme();
    }, []);

    return (
        <div className="dark:bg-neutral-850 font-inter flex h-screen w-full justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="my-24 max-w-6xl flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Stream Linkify</h1>
                {/* <p>Insert Link Insertion Here</p> */}
                <div>
                    <StreamingLinks
                        responseType="tracks"
                        linkResponse={placeholderResponse}
                    />
                </div>
            </div>
        </div>
    );
}
