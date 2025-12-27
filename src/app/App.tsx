import { placeholderResponse } from "@/utils/placeholder";
import StreamingLinks from "@/components/sections/StreamingLinks";
import ArtworkCard from "@/components/sections/ArtworkCard";
import ThemeButtons from "@/components/ui/ThemeButtons";

export default function App() {
    const linkResponse = placeholderResponse;

    return (
        <div className="dark:bg-neutral-850 font-inter relative flex h-screen w-full flex-col items-center justify-center bg-neutral-50 transition dark:bg-neutral-950">
            <div className="flex justify-center py-4 md:absolute md:top-4 md:right-8">
                <ThemeButtons />
            </div>

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
