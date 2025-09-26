import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import type { Spell } from "./data/spell-types";
import { SPELLS } from "./data/spells.db";

export default function SpellDetailPage() {
    const { id = "" } = useParams<{ id: string }>();
    const spell: Spell | undefined = useMemo(() => SPELLS.find(s => s.id === id), [id]);

    if (!spell) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-6">
                <Link to="/spells" className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">← Spells</Link>
                <h1 className="mt-3 text-2xl font-bold">Spell not found</h1>
                <p className="text-slate-400">The spell you requested does not exist in the local database.</p>
            </div>
        );
    }

    const c = spell.components;
    const comp = [
        c?.v ? "V" : null,
        c?.s ? "S" : null,
        c?.m ? `M (${c.m})` : null,
    ].filter(Boolean).join(", ");

    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <div className="mb-3 flex items-center gap-2">
                <Link to="/spells" className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">← Spells</Link>
            </div>

            <h1 className="text-3xl font-black tracking-tight">{spell.name}</h1>
            <div className="mt-1 text-sm text-slate-400">
                {spell.level === 0 ? "Truco (0)" : `Nivel ${spell.level}`} • {spell.school}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
                <Info label="Tiempo de lanzamiento" value={spell.casting_time || "—"} />
                <Info label="Alcance" value={spell.range || "—"} />
                <Info label="Duración" value={`${spell.duration || "—"}${spell.concentration ? " (Concentración)" : ""}`} />
                <Info label="Componentes" value={comp || "—"} />
                <Info label="Clases" value={spell.classes.join(", ")} />
                <Info label="Ritual" value={spell.ritual ? "Sí" : "No"} />
            </div>

            {spell.desc && <p className="mt-4 whitespace-pre-wrap text-slate-200">{spell.desc}</p>}
        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-xs uppercase tracking-widest text-slate-400">{label}</div>
            <div className="text-sm">{value}</div>
        </div>
    );
}