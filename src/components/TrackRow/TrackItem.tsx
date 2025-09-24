import { useEffect, useRef } from "react";
import type { Deck, Track } from "../../types";
import { parseYouTubeId } from "../../lib/utils.ts";
import { useYouTubePlayer } from "../../hooks/useYoutube.ts";

type Props = {
    t: Track;
    gainApplied: number; // ganancia final (mute/solo/master/xfader ya aplicados)
    onTogglePlay: (id: string) => void;
    onGain: (id: string, v: number) => void;
    onMute: (id: string) => void;
    onSolo: (id: string) => void;
    onDeck: (id: string, d: Deck) => void;
    onRemove: (id: string) => void;
};

export default function TrackItem({
                                      t, gainApplied, onTogglePlay, onGain, onMute, onSolo, onDeck, onRemove,
                                  }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ytId = t.kind === "youtube" ? parseYouTubeId(t.url) : null;
    const mountId = `yt-${t.id}`;

    // YouTube player wrapper
    const yt = useYouTubePlayer(mountId, ytId);

    // aplicar volumen / play-pause en elementos HTMLAudio
    useEffect(() => {
        if (t.kind !== "audio") return;
        const el = audioRef.current;
        if (!el) return;
        el.volume = gainApplied;
        if (t.playing) el.play().catch(() => {});
        else el.pause();
    }, [t.kind, t.playing, gainApplied]);

    // aplicar volumen / play-pause en YT
    useEffect(() => {
        if (t.kind !== "youtube") return;
        yt.setVolume(gainApplied);
        if (t.playing && gainApplied > 0) yt.play();
        else yt.pause();
    }, [t.kind, t.playing, gainApplied, yt]);

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400">
                        {t.kind.toUpperCase()} • Deck {t.deck}
                    </div>
                </div>
                <button
                    onClick={() => onRemove(t.id)}
                    className="rounded-lg bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700"
                    title="Eliminar pista"
                >
                    ✕
                </button>
            </div>

            {/* Controles */}
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => onTogglePlay(t.id)}
                    className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                        t.playing ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }`}
                >
                    {t.playing ? "Pause" : "Play"}
                </button>

                <button
                    onClick={() => onMute(t.id)}
                    className={`rounded-lg px-2 py-1 text-xs ${t.muted ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"}`}
                    title="Mute"
                >
                    {t.muted ? "Muted" : "Mute"}
                </button>

                <button
                    onClick={() => onSolo(t.id)}
                    className={`rounded-lg px-2 py-1 text-xs ${t.solo ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-200 hover:bg-slate-700"}`}
                    title="Solo"
                >
                    {t.solo ? "Solo★" : "Solo"}
                </button>

                <div className="ml-auto flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Deck</span>
                    <select
                        value={t.deck}
                        onChange={(e) => onDeck(t.id, e.target.value as Deck)}
                        className="rounded-md bg-black/30 px-2 py-1 text-xs"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>
            </div>

            {/* Ganancia (pre-xfader) */}
            <div className="mt-3">
                <label className="flex items-center justify-between text-xs text-slate-400">
                    <span>Volumen</span>
                    <span className="tabular-nums">{Math.round(t.gain * 100)}%</span>
                </label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={t.gain}
                    onChange={(e) => onGain(t.id, Number(e.target.value))}
                    className="w-full"
                />
            </div>

            {/* Montaje del reproductor */}
            {t.kind === "audio" ? (
                <audio ref={audioRef} src={t.url} preload="auto" loop />
            ) : (
                <div id={mountId} className="h-0 w-0 overflow-hidden" />
            )}
        </div>
    );
}