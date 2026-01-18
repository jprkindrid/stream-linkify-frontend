import { StreamingPlatformIcon } from "@/components/icons/StreamingPlatformIcon";
import {
    StreamingPlatforms,
    type StreamingPlatform,
} from "@/types/streamingPlatforms";

type LinkButtonProps = {
    platform: StreamingPlatform;
    url: string;
};

const LinkButton = ({ platform, url }: LinkButtonProps) => {
    if (!url) return null;
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group shadow-accent flex w-20 flex-col items-center gap-1.5 p-3 transition-all hover:-translate-y-1 hover:shadow-lg md:w-26"
        >
            <StreamingPlatformIcon
                platform={platform}
                size={30}
                className="transition-transform group-hover:scale-110 dark:text-white"
            />
            <span className="text-center text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {platform === StreamingPlatforms.AppleMusic
                    ? "Apple Music"
                    : platform}
            </span>
        </a>
    );
};

export default LinkButton;
