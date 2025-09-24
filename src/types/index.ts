export type TrackKind = "youtube" | "audio";
export type Deck = "A" | "B";

export type Track = {
    id: string;
    name: string;
    kind: TrackKind;
    url: string;     // YouTube o URL de audio
    gain: number;    // 0..1
    muted: boolean;
    solo: boolean;
    playing: boolean;
    deck: Deck;      // Para el crossfader
};

export type Preset = {
    id: string;
    name: string;
    createdAt: number;
    tracks: Track[];
    master: number;
    xfader: number;
};