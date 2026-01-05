import { useAccentContext } from "@/providers/accentProviders";
import type {
    AlbumResponse,
    TrackOrAlbum,
    TrackResponse,
} from "@/types/streamingPlatforms";
import {
    defaultAccent,
    getAverageColorFromImage,
    withAlphaMix,
} from "@/utils/colors";
import { useEffect } from "react";

type ArtworkCardProps = {
    responseType: TrackOrAlbum;
    linkResponse: TrackResponse | AlbumResponse;
};
const ArtworkCard = ({ responseType, linkResponse }: ArtworkCardProps) => {
    const title =
        responseType === "track"
            ? (linkResponse as TrackResponse).songName
            : (linkResponse as AlbumResponse).albumName;
    const { artistNames, artworkUrl } = linkResponse;
    const { accentColor, setAccentColor } = useAccentContext();
    console.log(`ARTWORK: ${linkResponse.artworkUrl ?? "none"}`);

    useEffect(() => {
        if (!linkResponse.artworkUrl || linkResponse.artworkUrl === "") {
            setAccentColor(defaultAccent);
            return;
        }

        const extractColor = async () => {
            try {
                const color = await getAverageColorFromImage(
                    linkResponse.artworkUrl
                );
                setAccentColor(color);
            } catch (err) {
                console.error("Failed to extract color:", err);
            }
        };
        extractColor();
    }, [linkResponse.artworkUrl, setAccentColor]);

    return (
        <div
            className="w-full max-w-sm overflow-hidden bg-white text-start shadow-xl dark:bg-neutral-800"
            style={{
                boxShadow: `0 8px 30px ${withAlphaMix(accentColor, 0.4)}`,
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
