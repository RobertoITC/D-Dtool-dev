import { useMemo, useState } from "react";
import type { Track } from "./types";
import { clamp01, defaultNameFromUrl, parseYouTubeId, uid, youtubeThumb } from "./lib/utils.ts";
import TrackItem from "./components/TrackRow/TrackItem";

export default function AmbienceDJ() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [master, setMaster] = useState(0.95);

    const [url, setUrl] = useState("");
    const [name, setName] = useState("");

    function addTrack() {
        const raw = url.trim();
        if (!raw) return;

        const ytId = parseYouTubeId(raw);
        const isYT = !!ytId;

        const t: Track = {
            id: uid(),
            name: (name || defaultNameFromUrl(raw)).trim(),
            kind: isYT ? "youtube" : "audio",
            url: raw,
            gain: 0.8,
            muted: false,
            playing: false,
            // thumbnail automático si es YouTube
            coverUrl: ytId ? youtubeThumb(ytId, "hq") : undefined,
        };

        setTracks((xs) => [t, ...xs]);
        setUrl("");
        setName("");
    }

    const togglePlay = (id: string) =>
        setTracks((xs) => xs.map((t) => (t.id === id ? { ...t, playing: !t.playing } : t)));

    const setGain = (id: string, v: number) =>
        setTracks((xs) => xs.map((t) => (t.id === id ? { ...t, gain: clamp01(v) } : t)));

    const toggleMute = (id: string) =>
        setTracks((xs) => xs.map((t) => (t.id === id ? { ...t, muted: !t.muted } : t)));

    const removeTrack = (id: string) =>
        setTracks((xs) => xs.filter((t) => t.id !== id));

    const anyPlaying = useMemo(() => tracks.some((t) => t.playing), [tracks]);

    function playPauseAll() {
        setTracks((xs) => xs.map((t) => ({ ...t, playing: !anyPlaying })));
    }
    function stopAll() {
        setTracks((xs) => xs.map((t) => ({ ...t, playing: false })));
    }
    function muteAllToggle() {
        const allMuted = tracks.every((t) => t.muted);
        setTracks((xs) => xs.map((t) => ({ ...t, muted: !allMuted })));
    }
    function clearAll() {
        if (confirm("¿Eliminar todas las pistas?")) setTracks([]);
    }

    return (
        <div className="relative mx-auto max-w-7xl px-4 py-8">

            {/* Header */}
            <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">
                        Ambience DJ <span className="text-emerald-400">(Simple)</span>
                    </h1>
                    <p className="text-slate-400">
                        Reproduce varios videos/audio a la vez. Controla volumen por pista, pausa y elimina. Miniatura automática en YouTube.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={playPauseAll}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                        {anyPlaying ? "Pausar todo" : "Reproducir todo"}
                    </button>
                    <button
                        onClick={stopAll}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                    >
                        Detener todo
                    </button>
                    <button
                        onClick={muteAllToggle}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                    >
                        Mute global
                    </button>
                    <button
                        onClick={clearAll}
                        className="rounded-xl bg-rose-600/90 px-4 py-2 text-sm text-white hover:bg-rose-600"
                    >
                        Limpiar
                    </button>
                </div>
            </header>

            {/* Maestro */}
            <section className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <label className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                    Volumen maestro
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={master}
                        onChange={(e) => setMaster(Number(e.target.value))}
                        className="w-full accent-fuchsia-500"
                    />
                    <span className="w-12 text-right text-sm tabular-nums">
            {Math.round(master * 100)}%
          </span>
                </div>
            </section>

            {/* Añadir pista */}
            <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="grid gap-3 md:grid-cols-12">
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Pega URL de YouTube o .mp3/.ogg/.wav"
                        className="md:col-span-8 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre (opcional)"
                        className="md:col-span-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    />
                    <button
                        onClick={addTrack}
                        className="md:col-span-1 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                        Añadir
                    </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                    Tip: pulsa <b>Reproducir todo</b> una vez para habilitar audio en el navegador.
                </p>
            </section>

            {/* Pistas */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tracks.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-slate-400">
                        No hay pistas todavía. Agrega una URL arriba para empezar 🎶
                    </div>
                )}
                {tracks.map((t) => (
                    <TrackItem
                        key={t.id}
                        t={t}
                        master={master}
                        onTogglePlay={togglePlay}
                        onGain={setGain}
                        onMute={toggleMute}
                        onRemove={removeTrack}
                    />
                ))}
            </section>
        </div>
    );
}