import { useAccentContext } from "@/providers/accentProviders";
import type { AlbumResponse, TrackResponse } from "@/types/streamingPlatforms";
import { withAlphaMix } from "@/utils/colors";

type ArtworkCardProps =
    | {
          responseType: "tracks";
          linkResponse: TrackResponse;
      }
    | {
          responseType: "albums";
          linkResponse: AlbumResponse;
      };
const ArtworkCard = ({ responseType, linkResponse }: ArtworkCardProps) => {
    const title =
        responseType === "tracks"
            ? linkResponse.songName
            : linkResponse.albumName;
    const { artistNames, artworkUrl } = linkResponse;
    const { accentColor } = useAccentContext();

    return (
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
    );
};

export default ArtworkCard;
