import { placeholderResponse } from "@/utils/placeholder";
import StreamingLinks from "@/components/sections/StreamingLinks";
import { useThemeContext } from "@/providers/themeProvider";
import { useEffect } from "react";
import ArtworkCard from "@/components/sections/ArtworkCard";

export default function App() {
    const themeContext = useThemeContext();
    useEffect(() => {
        themeContext.setTheme("system");
    }, []);

    const linkResponse = placeholderResponse;

    return (
        <div className="dark:bg-neutral-850 font-inter flex h-screen w-full justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="my-24 max-w-6xl flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Stream Linkify</h1>
                {/* <p>Insert Link Insertion Here</p> */}
                <div className="flex flex-col items-center justify-center gap-8 p-6">
                    <ArtworkCard
                        responseType="tracks"
                        linkResponse={linkResponse}
                    />
                    <StreamingLinks
                        streamingServices={linkResponse.streamingServices}
                    />
                </div>
            </div>
        </div>
    );
}
