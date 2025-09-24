import { useCallback, useEffect, useMemo, useState } from "react";
import type {Deck, Preset, Track} from "./types";
import { clamp01, defaultNameFromUrl, parseYouTubeId, uid } from "./lib/utils";
import TrackItem from "./components/TrackRow/TrackItem";
import PresetManager from "./components/TrackRow/PresetManager";

export default function AmbienceDJ() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [master, setMaster] = useState(0.9);
    const [xfader, setXfader] = useState(0.5); // 0 = sólo A, 1 = sólo B

    // --- agregar pista ---
    const addTrack = useCallback((url: string, name?: string, deck: Deck = "A") => {
        const kind = parseYouTubeId(url) ? "youtube" : "audio";
        const t: Track = {
            id: uid(),
            name: name?.trim() || defaultNameFromUrl(url),
            kind,
            url: url.trim(),
            gain: 0.8,
            muted: false,
            solo: false,
            playing: false,
            deck,
        };
        setTracks((xs) => [...xs, t]);
    }, []);

    // --- acciones por pista ---
    const removeTrack = (id: string) => setTracks((xs) => xs.filter((t) => t.id !== id));
    const togglePlay = (id: string) => setTracks((xs) => xs.map((t) => t.id === id ? { ...t, playing: !t.playing } : t));
    const setGain = (id: string, v: number) => setTracks((xs) => xs.map((t) => t.id === id ? { ...t, gain: clamp01(v) } : t));
    const toggleMute = (id: string) => setTracks((xs) => xs.map((t) => t.id === id ? { ...t, muted: !t.muted } : t));
    const toggleSolo = (id: string) => setTracks((xs) => {
        const isSolo = xs.find((t) => t.id === id)?.solo;
        return xs.map((t) => t.id === id ? { ...t, solo: !t.solo } : { ...t, solo: isSolo ? false : t.solo });
    });
    const setDeck = (id: string, d: Deck) => setTracks((xs) => xs.map((t) => t.id === id ? { ...t, deck: d } : t));

    // --- solo/mute logic + xfader ---
    const anySolo = tracks.some((t) => t.solo);
    const mixGain = useCallback((t: Track) => {
        if (t.muted) return 0;
        if (anySolo && !t.solo) return 0;
        const a = 1 - xfader;
        const b = xfader;
        const deckGain = t.deck === "A" ? a : b;
        return clamp01(t.gain * master * deckGain);
    }, [anySolo, master, xfader]);

    // --- atajos de teclado ---
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target && (e.target as HTMLElement).tagName === "INPUT") return;
            if (e.code === "Space") { // Play/Pause todo
                e.preventDefault();
                const anyPlaying = tracks.some((t) => t.playing);
                setTracks((xs) => xs.map((t) => ({ ...t, playing: !anyPlaying })));
            }
            if (e.key.toLowerCase() === "m") { // Mute all
                setTracks((xs) => xs.map((t) => ({ ...t, muted: !xs.every((y) => y.muted) })));
            }
            if (e.key.toLowerCase() === "s") { // Clear solo
                setTracks((xs) => xs.map((t) => ({ ...t, solo: false })));
            }
            // 1..9: toggle play de la pista i
            const num = Number(e.key);
            if (Number.isInteger(num) && num >= 1 && num <= 9) {
                const idx = num - 1;
                const id = tracks[idx]?.id;
                if (id) togglePlay(id);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [tracks, togglePlay]);

    // --- cargar preset ---
    const handleLoadPreset = (p: Preset) => {
        setTracks(p.tracks);
        setMaster(p.master);
        setXfader(p.xfader);
    };

    // --- UI helpers ---
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [deck, setDeckSel] = useState<Deck>("A");

    function addFromForm() {
        if (!url.trim()) return;
        addTrack(url, name, deck);
        setUrl("");
        setName("");
    }

    const left = useMemo(() => tracks.filter((t) => t.deck === "A"), [tracks]);
    const right = useMemo(() => tracks.filter((t) => t.deck === "B"), [tracks]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-6">
                <h1 className="text-3xl font-black tracking-tight">Ambience DJ</h1>
                <p className="text-slate-400">
                    Mezcla pistas (YouTube o audio) con volumen por pista, solo/mute, crossfader A/B y presets.
                    Tip: Presiona <kbd className="rounded bg-black/40 px-1">Space</kbd> para Play/Pause global.
                </p>
            </header>

            {/* Panel de control global */}
            <section className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
                <div>
                    <label className="flex items-center justify-between text-xs text-slate-400">
                        <span>Volumen maestro</span>
                        <span className="tabular-nums">{Math.round(master * 100)}%</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={master}
                        onChange={(e) => setMaster(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="flex items-center justify-between text-xs text-slate-400">
                        <span>Crossfader (A ↔ B)</span>
                        <span className="tabular-nums">{Math.round(xfader * 100)}%</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={xfader}
                        onChange={(e) => setXfader(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </section>

            {/* Formulario de añadir pista */}
            <section className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid gap-3 md:grid-cols-5">
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Pega URL de YouTube o .mp3/.ogg/.wav"
                        className="md:col-span-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600"
                    />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre (opcional)"
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600"
                    />
                    <select
                        value={deck}
                        onChange={(e) => setDeckSel(e.target.value as Deck)}
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                        <option value="A">Deck A</option>
                        <option value="B">Deck B</option>
                    </select>
                    <button
                        onClick={addFromForm}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                        Añadir pista
                    </button>
                </div>
            </section>

            {/* Mixer A/B responsive */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <h3 className="mb-2 text-sm font-semibold">Deck A</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {left.length === 0 && <p className="text-xs text-slate-400">No hay pistas en A.</p>}
                        {left.map((t) => (
                            <TrackItem
                                key={t.id}
                                t={t}
                                gainApplied={mixGain(t)}
                                onTogglePlay={togglePlay}
                                onGain={setGain}
                                onMute={toggleMute}
                                onSolo={toggleSolo}
                                onDeck={setDeck}
                                onRemove={removeTrack}
                            />
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <h3 className="mb-2 text-sm font-semibold">Deck B</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {right.length === 0 && <p className="text-xs text-slate-400">No hay pistas en B.</p>}
                        {right.map((t) => (
                            <TrackItem
                                key={t.id}
                                t={t}
                                gainApplied={mixGain(t)}
                                onTogglePlay={togglePlay}
                                onGain={setGain}
                                onMute={toggleMute}
                                onSolo={toggleSolo}
                                onDeck={setDeck}
                                onRemove={removeTrack}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Presets */}
            <section className="mt-4">
                <PresetManager tracks={tracks} master={master} xfader={xfader} onLoad={handleLoadPreset} />
            </section>
        </div>
    );
}