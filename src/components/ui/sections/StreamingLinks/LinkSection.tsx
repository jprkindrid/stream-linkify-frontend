import { StreamingPlatformIcon } from "@/components/icons/StreamingPlatformIcon";
import type { StreamingPlatform } from "@/types/streamingPlatforms";

type LinkSectionProps = {
    platform: StreamingPlatform;
    url: string;
};

const LinkSection = ({ platform, url }: LinkSectionProps) => {
    return (
        <a
            key={platform}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex size-18 flex-col items-center justify-center rounded-md bg-neutral-100 shadow-md transition-all duration-300 hover:scale-105 hover:brightness-105 dark:bg-neutral-900 dark:shadow-neutral-700 dark:hover:brightness-120"
        >
            <StreamingPlatformIcon
                platform={platform}
                size={30}
                className="mb-1"
            />
            <figcaption className="text-xs">{platform}</figcaption>
        </a>
    );
};

export default LinkSection;
