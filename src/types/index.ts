export type TrackKind = "youtube" | "audio";

export type Track = {
    id: string;
    name: string;
    kind: TrackKind;
    url: string;
    gain: number;     // 0..1
    muted: boolean;
    playing: boolean;
    coverUrl?: string; // miniatura auto (YouTube)
};