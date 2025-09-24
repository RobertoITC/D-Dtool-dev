import React from "react";
import type { Track, Side } from "../types";

export function TrackTable({
                               tracks, updateTrack, removeTrack
                           }:{
    tracks: Track[];
    updateTrack: (id:string, patch: Partial<Track>) => void;
    removeTrack: (id:string) => void;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
                <thead className="bg-white/5 text-left text-slate-300">
                <tr>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Side</th>
                    <th className="px-3 py-2">Solo</th>
                    <th className="px-3 py-2">Loop</th>
                    <th className="px-3 py-2">Show</th>
                    <th className="px-3 py-2">Controls</th>
                </tr>
                </thead>
                <tbody>
                {tracks.map(t => (
                    <tr key={t.id} className="odd:bg-white/0 even:bg-white/[0.02]">
                        <td className="px-3 py-2 font-medium">{t.title}</td>
                        <td className="px-3 py-2">{t.type}</td>
                        <td className="px-3 py-2">
                            <select value={t.side} onChange={e=>updateTrack(t.id,{ side: e.target.value as Side })} className="rounded-md bg-black/40 px-2 py-1">
                                <option value="A">A</option><option value="B">B</option><option value="Both">Both</option>
                            </select>
                        </td>
                        <td className="px-3 py-2"><input type="checkbox" checked={t.solo} onChange={e=>updateTrack(t.id,{ solo: e.target.checked })}/></td>
                        <td className="px-3 py-2"><input type="checkbox" checked={t.loop} onChange={e=>updateTrack(t.id,{ loop: e.target.checked })}/></td>
                        <td className="px-3 py-2"><input type="checkbox" checked={t.showVideo} onChange={e=>updateTrack(t.id,{ showVideo: e.target.checked })}/></td>
                        <td className="px-3 py-2">
                            <button onClick={()=>updateTrack(t.id,{ playing: !t.playing })} className="rounded-md bg-slate-700 px-2 py-1 hover:bg-slate-600">{t.playing?"Pause":"Play"}</button>
                            <button onClick={()=>removeTrack(t.id)} className="ml-2 rounded-md bg-rose-800 px-2 py-1 hover:bg-rose-700">Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}