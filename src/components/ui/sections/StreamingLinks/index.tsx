import {
    StreamingPlatforms,
    type AlbumResponse,
    type TrackResponse,
} from "@/types/streamingPlatforms";
import LinkSection from "./LinkSection";

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

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <div className="overflow-clip rounded-md px-2 py-2 shadow-md">
                <img src={artworkUrl} className="size-100" />
                <h2 className="flex w-full flex-col items-start pb-2 text-2xl leading-none">
                    <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-400">
                        {artistNames.join(", ")}
                    </div>
                    <div>{title}</div>
                </h2>
            </div>
            <div className="flex flex-wrap gap-4">
                {platforms.map((platform) => {
                    const url = streamingServices[platform];
                    return <LinkSection platform={platform} url={url ?? ""} />;
                })}
            </div>
        </div>
    );
};

export default StreamingLinks;
