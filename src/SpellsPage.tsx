// src/SpellsPage.tsx
import { useMemo, useState } from "react";
import type { Spell, SpellByClassMap, SpellClass, SpellLevel } from "./data/spell-types";
import SPELLS from "./data/spells.db"; // importa tu DB de conjuros
const ALL_LEVELS = [0,1,2,3,4,5,6,7,8,9] as const satisfies readonly SpellLevel[];
const ALL_CLASSES: SpellClass[] = [
    "bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard",
    // quita/añade los que uses en tu DB (si tienes artificer, etc.)
];

export default function SpellsPage() {
    const [q, setQ] = useState<string>("");
    const [cls, setCls] = useState<SpellClass>("wizard");     // clase por defecto
    const [lvl, setLvl] = useState<SpellLevel | "all">("all"); // nivel seleccionado

    // Filtro base (texto + clase)
    const baseFiltered: Spell[] = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return SPELLS.filter((s: Spell) => {
            const passClass = s.classes.includes(cls);
            const passText =
                qq.length === 0 ||
                s.name.toLowerCase().includes(qq) ||
                (s.desc ? s.desc.toLowerCase().includes(qq) : false);
            return passClass && passText;
        }).sort((a: Spell, b: Spell) => a.name.localeCompare(b.name));
    }, [q, cls]);

    // Particiona por nivel
    const byLevel: Record<SpellLevel, Spell[]> = useMemo(() => {
        const out: Record<SpellLevel, Spell[]> = {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
        for (const s of baseFiltered) out[s.level].push(s);
        for (const L of ALL_LEVELS) out[L].sort((a: Spell, b: Spell) => a.name.localeCompare(b.name));
        return out;
    }, [baseFiltered]);

    // Nivel activo
    const activeLevels: readonly SpellLevel[] =
        lvl === "all" ? ALL_LEVELS : [lvl];

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-4">
                <h1 className="text-3xl font-black tracking-tight">Spells</h1>
                <p className="text-slate-400">Filtra por clase, nivel y texto.</p>
            </header>

            {/* Filtros */}
            <section className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Buscar</label>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Fireball, Cure Wounds…"
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Clase</label>
                    <select
                        value={cls}
                        onChange={(e) => setCls(e.target.value as SpellClass)}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                        {ALL_CLASSES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Nivel</label>
                    <select
                        value={String(lvl)}
                        onChange={(e) => {
                            const v = e.target.value;
                            setLvl(v === "all" ? "all" : (Number(v) as SpellLevel));
                        }}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                        <option value="all">Todos</option>
                        {ALL_LEVELS.map((L) => (
                            <option key={L} value={L}>{L === 0 ? "Trucos (0)" : `Nivel ${L}`}</option>
                        ))}
                    </select>
                </div>
            </section>

            {/* Listado */}
            <section className="grid gap-4">
                {activeLevels.map((L) => {
                    const list: Spell[] = byLevel[L]; // <- tipado explícito
                    if (!list || list.length === 0) return null;
                    return (
                        <div key={L} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <h2 className="mb-2 text-lg font-bold">
                                {L === 0 ? "Trucos (Nivel 0)" : `Nivel ${L}`}
                            </h2>
                            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {list.map((s: Spell) => (
                                    <li key={s.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
                                        <div className="mb-1 font-semibold">{s.name}</div>
                                        <div className="text-xs text-slate-400">
                                            {s.school} • {s.ritual ? "Ritual • " : ""}{s.concentration ? "Concentración" : ""}
                                        </div>
                                        {s.desc && <p className="mt-2 line-clamp-4 text-sm text-slate-200">{s.desc}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
                {/* Si no hay nada en ningún nivel */}
                {activeLevels.every((L) => byLevel[L].length === 0) && (
                    <p className="text-sm text-slate-400">No hay conjuros que coincidan con tu filtro.</p>
                )}
            </section>
        </div>
    );
}