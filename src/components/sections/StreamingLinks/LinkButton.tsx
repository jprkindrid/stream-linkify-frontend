import { StreamingPlatformIcon } from "@/components/icons/StreamingPlatformIcon";
import {
    StreamingPlatforms,
    type StreamingPlatform,
} from "@/types/streamingPlatforms";
import { tempAccent, withAlphaMix } from "@/utils/colors";

type LinkButtonProps = {
    platform: StreamingPlatform;
    url: string;
};

const accentColor = tempAccent;

const LinkButton = ({ platform, url }: LinkButtonProps) => {
    if (!url) return null;
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center gap-1.5 p-3 transition-all hover:-translate-y-1 hover:shadow-lg"
            style={
                {
                    "--tw-shadow-color": withAlphaMix(accentColor, 0.4),
                } as React.CSSProperties
            }
        >
            <StreamingPlatformIcon
                platform={platform}
                size={30}
                className="transition-transform group-hover:scale-110 dark:text-white"
            />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {platform === StreamingPlatforms.AppleMusic
                    ? "Apple Music"
                    : platform}
            </span>
        </a>
    );
};

export default LinkButton;
