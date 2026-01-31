export const StreamingPlatforms = {
    Spotify: "Spotify",
    AppleMusic: "AppleMusic",
    Deezer: "Deezer",
    Tidal: "Tidal",
    Soundcloud: "Soundcloud",
} as const;

export type StreamingPlatform =
    (typeof StreamingPlatforms)[keyof typeof StreamingPlatforms];

export type TrackResponse = {
    artistNames: string[];
    songName: string;
    streamingServices: Partial<Record<StreamingPlatform, string>>;
    artworkUrl: string;
};

export type AlbumResponse = Omit<TrackResponse, "songName"> & {
    albumName: string;
};

export type TrackOrAlbum = "track" | "album";
