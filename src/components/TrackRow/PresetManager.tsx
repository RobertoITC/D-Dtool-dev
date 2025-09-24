import { useMemo, useState } from "react";
import type { Preset, Track } from "../../types";
import { uid } from "../../lib/utils";

const KEY = "ambience-presets.v1";

function loadPresets(): Preset[] {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Preset[]) : [];
    } catch { return []; }
}
function savePresets(ps: Preset[]) {
    localStorage.setItem(KEY, JSON.stringify(ps));
}

type Props = {
    tracks: Track[];
    master: number;
    xfader: number;
    onLoad: (p: Preset) => void;
};

export default function PresetManager({ tracks, master, xfader, onLoad }: Props) {
    const [name, setName] = useState("");
    const [presets, setPresets] = useState<Preset[]>(() => loadPresets());

    const canSave = useMemo(() => tracks.length > 0 && name.trim().length > 0, [tracks.length, name]);

    function save() {
        if (!canSave) return;
        const p: Preset = { id: uid(), name: name.trim(), createdAt: Date.now(), tracks, master, xfader };
        const next = [p, ...presets].slice(0, 50);
        setPresets(next);
        savePresets(next);
        setName("");
    }

    function remove(id: string) {
        const next = presets.filter((p) => p.id !== id);
        setPresets(next);
        savePresets(next);
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <h3 className="mb-2 text-sm font-semibold">Presets</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del preset"
                    className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600"
                />
                <button
                    onClick={save}
                    disabled={!canSave}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white enabled:hover:bg-emerald-500 disabled:opacity-50"
                >
                    Guardar
                </button>
            </div>

            <ul className="mt-3 grid gap-2">
                {presets.length === 0 && <li className="text-xs text-slate-400">No hay presets guardados.</li>}
                {presets.map((p) => (
                    <li key={p.id} className="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2">
                        <div className="min-w-0">
                            <div className="truncate text-sm">{p.name}</div>
                            <div className="text-[10px] text-slate-500">Pistas: {p.tracks.length} • {new Date(p.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onLoad(p)}
                                className="rounded-lg bg-slate-800 px-3 py-1 text-xs hover:bg-slate-700"
                            >
                                Cargar
                            </button>
                            <button
                                onClick={() => remove(p.id)}
                                className="rounded-lg bg-slate-800 px-3 py-1 text-xs hover:bg-slate-700"
                            >
                                Borrar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}