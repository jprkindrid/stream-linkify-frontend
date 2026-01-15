import { useAccentContext } from "@/providers/accentProviders";
import { withAlphaMix } from "@/utils/colors";

const ArtworkSkeleton = () => {
    const { accentColor } = useAccentContext();

    return (
        <div
            className="w-full max-w-sm flex-1 animate-pulse overflow-hidden bg-neutral-100 text-start shadow-xl dark:bg-neutral-700"
            style={{
                boxShadow: `0 8px 30px ${withAlphaMix(accentColor, 0.4)}`,
            }}
        >
            <div className="aspect-square w-full object-cover"></div>
            <div className="p-4">
                <div className="mb-1.5 h-3.5 w-40 bg-neutral-500/50 font-medium dark:bg-neutral-400/50"></div>
                <div className="-mb-1 h-7 w-64 bg-neutral-900/50 text-xl font-bold dark:bg-white/50"></div>
            </div>
        </div>
    );
};

export default ArtworkSkeleton;
