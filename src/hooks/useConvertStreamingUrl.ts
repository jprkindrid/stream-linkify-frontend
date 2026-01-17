import { API_URL } from "@/config/environment";
import type {
    AlbumResponse,
    TrackOrAlbum,
    TrackResponse,
} from "@/types/streamingPlatforms";
import { useQuery } from "@tanstack/react-query";

type ResponseMap = {
    track: TrackResponse;
    album: AlbumResponse;
};

export function useStreamingQuery<T extends TrackOrAlbum>(
    url: string,
    type: T
) {
    return useQuery<ResponseMap[T]>({
        queryKey: [type, url],
        queryFn: async () => {
            const reqBody = JSON.stringify(
                type === "track" ? { trackUrl: url } : { albumUrl: url }
            );
            const reqUrl = `${API_URL}/api/UrlConversion/${type}s`;
            const res = await fetch(reqUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: reqBody,
            });

            if (!res.ok) {
                const error = await res.json();
                console.log(error);
                throw new Error(error.error || "Failed to fetch");
            }

            return res.json();
        },
        enabled: url.length > 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
    });
}
