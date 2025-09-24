import type {Track} from "../types";

export function effectiveVolume(
    t: Track,
    masterVol: number,
    crossfade: number,
    anySolo: boolean
) {
    if (t.muted) return 0;
    if (anySolo && !t.solo) return 0;
    const sideFactor = t.side === "A" ? (1 - crossfade) : t.side === "B" ? crossfade : 1;
    return t.volume * masterVol * sideFactor;
}