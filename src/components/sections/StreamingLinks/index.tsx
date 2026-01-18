import {
    StreamingPlatforms,
    type StreamingPlatform,
} from "@/types/streamingPlatforms";
import LinkButton from "./LinkButton";

type StreamingLinksProps = {
    streamingServices: Partial<Record<StreamingPlatform, string>>;
};

const StreamingLinks = ({ streamingServices }: StreamingLinksProps) => {
    const platforms = Object.values(StreamingPlatforms);

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-6">
            <div className="grid w-full max-w-md grid-cols-4 gap-3">
                {platforms.map((platform) => {
                    return (
                        <LinkButton
                            platform={platform}
                            key={platform}
                            url={streamingServices[platform] ?? ""}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StreamingLinks;
