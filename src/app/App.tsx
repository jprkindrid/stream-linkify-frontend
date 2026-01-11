import { placeholderResponse } from "@/utils/placeholder";
import StreamingLinks from "@/components/sections/StreamingLinks";
import ArtworkCard from "@/components/sections/ArtworkCard";
import ThemeButtons from "@/components/ui/ThemeButtons";
import LinkInput from "@/components/sections/LinkInput";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import type { Transition, MotionProps } from "motion/react";
import { useState } from "react";
import { useStreamingQuery } from "@/hooks/useConvertStreamingUrl";
import type { TrackOrAlbum } from "@/types/streamingPlatforms";
import { type QueryStatus } from "@tanstack/react-query";
import HeroText from "@/components/sections/HeroText";
import DevControls from "@/components/sections/DevControls";

interface SubmittedQuery {
    url: string;
    type: TrackOrAlbum;
}

const fadeScale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 },
} satisfies MotionProps;

const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} satisfies Transition;

export default function App() {
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

    const [devOverride, setDevOverride] = useState<QueryStatus | null>(null);
    const displayStatus = devOverride ?? status;
    const showResults = displayStatus == "success";

    return (
        <div className="dark:bg-neutral-850 font-inter relative flex min-h-screen w-full flex-col items-center justify-center bg-neutral-50 transition dark:bg-neutral-950">
            <div className="flex w-full max-w-4xl flex-1 flex-col justify-center">
                <LayoutGroup>
                    <div className="flex flex-1 flex-col items-center justify-center gap-8">
                        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-4 md:right-8">
                            <ThemeButtons />
                        </div>
                        <motion.div
                            animate={{
                                flex: showResults ? "1 1 auto" : "0 0 auto",
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={showResults ? "pt-12" : ""}
                        />
                        {!showResults && <HeroText />}
                        <motion.div
                            layout
                            animate={{ scale: showResults ? 0.8 : 1 }}
                            transition={springTransition}
                        >
                            <LinkInput
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                            />
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {displayStatus == "success" && (
                                <motion.div
                                    layout
                                    {...fadeScale}
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
            {import.meta.env.DEV && (
                <DevControls
                    setDevOverride={setDevOverride}
                    devOverride={devOverride}
                />
            )}
        </div>
    );
}
