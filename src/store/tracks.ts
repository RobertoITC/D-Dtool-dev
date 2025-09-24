import { useMemo } from "react";
import type {Track} from "../types";
import { usePersistentState } from "../hooks/usePersistentState";

export function useTracksStore() {
    const [tracks, setTracks] = usePersistentState<Track[]>("ambience_dj_tracks", []);
    const [masterVol, setMasterVol] = usePersistentState<number>("ambience_dj_master", 0.8);
    const [crossfade, setCrossfade] = usePersistentState<number>("ambience_dj_cf", 0.5);

    const anySolo = useMemo(() => tracks.some(t => t.solo), [tracks]);

    const updateTrack = (id: string, patch: Partial<Track>) =>
        setTracks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
    const removeTrack = (id: string) =>
        setTracks(prev => prev.filter(t => t.id !== id));

    return {
        tracks, setTracks, updateTrack, removeTrack,
        masterVol, setMasterVol,
        crossfade, setCrossfade,
        anySolo,
    };
}