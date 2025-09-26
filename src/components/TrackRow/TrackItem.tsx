import { useEffect, useRef } from "react";
import type { Track } from "../../types";
import { parseYouTubeId } from "../../lib/utils";
import { useYouTubePlayer } from "../../hooks/useYoutube.ts";

type Props = {
    t: Track;
    master: number;
    onTogglePlay: (id: string) => void;
    onGain: (id: string, v: number) => void;
    onMute: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TrackItem({
                                      t, master, onTogglePlay, onGain, onMute, onRemove,
                                  }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ytId = t.kind === "youtube" ? parseYouTubeId(t.url) : null;
    const mountId = `yt-${t.id}`;

    // Montamos SIEMPRE el player (oculto) para poder reproducir con miniatura
    const yt = useYouTubePlayer(mountId, ytId);

    const finalGain = t.muted ? 0 : Math.max(0, Math.min(1, t.gain * master));

    // HTML <audio>
    useEffect(() => {
        if (t.kind !== "audio") return;
        const el = audioRef.current;
        if (!el) return;
        el.volume = finalGain;
        if (t.playing && finalGain > 0) el.play().catch(() => {});
        else el.pause();
    }, [t.kind, t.playing, finalGain]);

    // YouTube iframe
    useEffect(() => {
        if (t.kind !== "youtube") return;
        yt.setVolume(finalGain);
        if (t.playing && finalGain > 0) { yt.unmute(); yt.play(); } else { yt.pause(); }
    }, [t.kind, t.playing, finalGain, yt]);

    // Play/Pause inmediato en el mismo click (ayuda con autoplay en móvil)
    function handlePlayPauseClick() {
        if (t.kind === "youtube") {
            if (!t.playing) { yt.unmute(); yt.play(); } else { yt.pause(); }
        } else {
            const el = audioRef.current;
            if (el) {
                if (!t.playing) el.play().catch(() => {});
                else el.pause();
            }
        }
        onTogglePlay(t.id);
    }

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between gap-2">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400">
                        {t.kind.toUpperCase()}
                    </div>
                </div>
                <button
                    onClick={() => onRemove(t.id)}
                    className="rounded-lg bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700"
                    title="Eliminar"
                >
                    ✕
                </button>
            </div>

            {/* Miniatura para YouTube o placeholder para audio */}
            {t.kind === "youtube" ? (
                <div className="mb-3">
                    {/* Player oculto */}
                    <div className="h-0 w-0 overflow-hidden">
                        <div id={mountId} className="h-0 w-0" />
                    </div>
                    {/* Imagen (thumbnail) */}
                    {t.coverUrl && (
                        <img
                            src={t.coverUrl}
                            alt=""
                            className="aspect-video w-full rounded-lg border border-white/10 object-cover"
                        />
                    )}
                </div>
            ) : (
                <div className="mb-3">
                    <div className="aspect-video w-full rounded-lg border border-dashed border-white/10 bg-black/20 grid place-items-center text-slate-500">
                        🎵 Audio
                    </div>
                    <audio ref={audioRef} src={t.url} preload="auto" loop />
                </div>
            )}

            {/* Controles */}
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={handlePlayPauseClick}
                    className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                        t.playing
                            ? "bg-emerald-600 text-white hover:bg-emerald-500"
                            : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }`}
                >
                    {t.playing ? "Pause" : "Play"}
                </button>

                <button
                    onClick={() => onMute(t.id)}
                    className={`rounded-lg px-2 py-1 text-xs ${
                        t.muted ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }`}
                >
                    {t.muted ? "Muted" : "Mute"}
                </button>
            </div>

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
        </div>
    );
}