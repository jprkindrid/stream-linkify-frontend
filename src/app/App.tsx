import { placeholderResponse } from "@/utils/placeholder";
import StreamingLinks from "@/components/sections/StreamingLinks";
import ArtworkCard from "@/components/sections/ArtworkCard";
import ThemeButtons from "@/components/ui/ThemeButtons";
import LinkInput from "@/components/sections/LinkInput";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { useState } from "react";
import { useStreamingQuery } from "@/hooks/useConvertStreamingUrl";
import type { TrackOrAlbum } from "@/types/streamingPlatforms";

interface SubmittedQuery {
    url: string;
    type: TrackOrAlbum;
}

export default function App() {
    const [tempButton, setTempButton] = useState(true);

    const [submittedQuery, setSubmittedQuery] = useState<SubmittedQuery>({
        url: "",
        type: "track",
    });

    const { data, isLoading, error, status } = useStreamingQuery(
        submittedQuery?.url ?? "",
        submittedQuery?.type ?? "track"
    );

    if (error) {
        console.log(`query error: ${error}`);
    }

    const handleSubmit = (url: string, type: TrackOrAlbum) => {
        setSubmittedQuery({ url, type });
    };
    const linkResponse = data ?? placeholderResponse;

    return (
        <div className="dark:bg-neutral-850 font-inter relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-50 transition dark:bg-neutral-950">
            <div className="w-full max-w-4xl">
                <div className="flex justify-center py-4 md:absolute md:top-4 md:right-8">
                    <ThemeButtons />
                </div>
                <LayoutGroup>
                    <div className="flex min-h-screen flex-col items-center gap-8">
                        {/* Spacer for animation reasons in lieu of a justify-center */}

                        <motion.div
                            animate={{ height: tempButton ? "20vh" : "40vh" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        {!tempButton && (
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-2xl font-bold">
                                    Paste a link to get started
                                </p>
                                <p className="text-sm text-neutral-500">
                                    Supports Spotify, Apple Music, Deezer, and
                                    Tidal
                                </p>
                            </div>
                        )}
                        <motion.div
                            layout
                            animate={{ scale: tempButton ? 0.8 : 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        >
                            <LinkInput
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                            />
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {tempButton && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center justify-center gap-8 p-6"
                                >
                                    <ArtworkCard
                                        responseType={submittedQuery.type}
                                        linkResponse={linkResponse}
                                    />
                                    <StreamingLinks
                                        streamingServices={
                                            linkResponse.streamingServices
                                        }
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </LayoutGroup>
            </div>
            <button
                className="bg-accent absolute top-0 left-0 p-1"
                onClick={() => setTempButton(!tempButton)}
            >
                Transition
            </button>
        </div>
    );
}
