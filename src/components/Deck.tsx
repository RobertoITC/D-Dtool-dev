import type { Track } from "../types";
import { TrackRow } from "./TrackRow/TrackRow";

export function Deck({
                         label, side, tracks, ...rowProps
                     }:{
    label: string;
    side: "A" | "B";
    tracks: Track[];
    // forward down whatever TrackRow needs (updateTrack, removeTrack, ytReady, effectiveVol map, etc.)
    [k:string]: any;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold">{label}</h3>
                <span className="text-xs uppercase tracking-widest text-slate-400">{side}</span>
            </div>
            <div className="grid gap-3">
                {tracks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-400">
                        No tracks assigned. Set a track's side to “{side}”.
                    </div>
                )}
                {tracks.map(t => (
                    <TrackRow key={t.id} track={t} {...rowProps}/>
                ))}
            </div>
        </div>
    );
}