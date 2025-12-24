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
        <div className="flex flex-col items-center justify-center">
            <h2 className="flex gap-2 text-2xl">
                <div>{artistNames.join(", ")}</div>
                <div>{" - "}</div>
                <div>{title}</div>
            </h2>
            <img src={artworkUrl} className="size-100" />
            <div className="flex flex-col">
                {platforms.map((platform) => {
                    const url = streamingServices[platform];

                    return <LinkSection platform={platform} url={url ?? ""} />;
                })}
            </div>
        </div>
    );
};

export default StreamingLinks;
