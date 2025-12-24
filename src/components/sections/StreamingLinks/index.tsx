import {
    StreamingPlatforms,
    type AlbumResponse,
    type TrackResponse,
} from "@/types/streamingPlatforms";
import LinkSection from "./LinkSection";
import { tempAccent, withAlphaMix } from "@/utils/colors";

type StreamingLinksProps =
    | {
          responseType: "tracks";
          linkResponse: TrackResponse;
      }
    | {
          responseType: "albums";
          linkResponse: AlbumResponse;
      };

const StreamingLinks = ({
    responseType,
    linkResponse,
}: StreamingLinksProps) => {
    const { artistNames, streamingServices, artworkUrl } = linkResponse;

    const title =
        responseType === "tracks"
            ? linkResponse.songName
            : linkResponse.albumName;

    const platforms = Object.values(StreamingPlatforms);

    const accentColor = tempAccent;

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-6">
            <div
                className="w-full max-w-sm overflow-hidden bg-white shadow-xl dark:bg-neutral-800"
                style={{
                    boxShadow: `0 8px 30px ${withAlphaMix(accentColor, 0.25)}`,
                }}
            >
                <img
                    src={artworkUrl}
                    alt={title}
                    className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                    <p className="dark:text-neural-400 text-sm font-medium text-neutral-500">
                        {artistNames.join(", ")}
                    </p>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="sm:grid-cold-5 grid w-full max-w-md grid-cols-4 gap-3">
                {platforms.map((platform) => {
                    return (
                        <LinkSection
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
