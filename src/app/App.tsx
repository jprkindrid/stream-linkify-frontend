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
import clsx from "clsx";
import ArtworkSkeleton from "@/components/sections/ArtworkSkeleton";
import LinkSkeleton from "@/components/sections/LinkSkeleton";
import ErrorState from "@/components/sections/ErrorState";

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

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { data, isLoading, error, status } = useStreamingQuery(
        submittedQuery?.url ?? "",
        submittedQuery?.type ?? "track"
    );

    const handleSubmit = (url: string, type: TrackOrAlbum) => {
        setSubmittedQuery({ url, type });
        setHasSubmitted(true);
    };

    const linkResponse = data ?? placeholderResponse;

    const [devOverride, setDevOverride] = useState<QueryStatus | null>(null);
    const displayStatus = devOverride ?? (hasSubmitted ? status : null);
    const showResults = displayStatus != null;

    return (
        <div className="dark:bg-neutral-850 font-inter relative flex min-h-screen w-full flex-col items-center justify-center bg-neutral-50 transition dark:bg-neutral-950">
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-4 md:right-8">
                <ThemeButtons />
            </div>
            <div
                className={clsx(
                    "relative flex h-full w-full max-w-4xl flex-col justify-center",
                    showResults && "mt-20"
                )}
            >
                <LayoutGroup>
                    <div className="flex max-h-screen w-full flex-col items-center justify-center gap-4 overflow-y-auto sm:gap-8">
                        {!showResults && <HeroText />}
                        <motion.div
                            layout
                            animate={{ scale: showResults ? 0.8 : 1 }}
                            transition={springTransition}
                            className="w-full"
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
                            {displayStatus == "pending" && (
                                <motion.div
                                    layout
                                    {...fadeScale}
                                    className="flex flex-col items-center justify-center gap-8 p-6"
                                >
                                    <ArtworkSkeleton />
                                    <LinkSkeleton />
                                </motion.div>
                            )}
                            {displayStatus == "error" && (
                                <ErrorState
                                    error={error ?? "unknown error"}
                                    fadeScale={fadeScale}
                                />
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
