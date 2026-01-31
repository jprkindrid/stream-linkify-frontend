import type { TrackResponse } from "@/types/streamingPlatforms";

export const placeholderResponse: TrackResponse = {
    artistNames: ["Kindrid", "Syberlilly"],
    songName: "Long Night of Solace",
    streamingServices: {
        Spotify: "https://open.spotify.com/track/6Bv5v4qnrm6P9zfiQPd3a7",
        AppleMusic:
            "https://music.apple.com/us/album/long-night-of-solace/1801233821?i=1801233826",
        Deezer: "https://www.deezer.com/track/3271569911",
        Tidal: "https://listen.tidal.com/track/422990078",
        Soundcloud: "https://soundcloud.com/kindridmusic/long-night-of-solace",
    },
    artworkUrl:
        "https://i.scdn.co/image/ab67616d0000b273146c5a8b9da16e9072279041",
};
