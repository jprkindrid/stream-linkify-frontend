import { StreamingPlatformIcon } from "@/components/icons/StreamingPlatformIcon";
import type { StreamingPlatform } from "@/types/streamingPlatforms";

type LinkSectionProps = {
    platform: StreamingPlatform;
    url: string;
};

const LinkSection = ({ platform, url }: LinkSectionProps) => {
    return (
        <div>
            <StreamingPlatformIcon platform={platform} size={30} />
            <a key={platform} href={url} target="_blank" rel="noreferrer">
                {platform}
            </a>
        </div>
    );
};

export default LinkSection;
