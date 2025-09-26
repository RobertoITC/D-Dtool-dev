import { useMemo, useState } from "react";
import type { Spell, SpellClass, SpellLevel } from "./data/spell-types";
import { SPELLS } from "./data/spells.db";
import SpellCard from "./components/spells/SpellCard";
import {Link} from "react-router-dom";

const ALL_LEVELS = [0,1,2,3,4,5,6,7,8,9] as const;
const ALL_CLASSES: SpellClass[] = ["bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard"];

export default function SpellsPage() {
    const [q, setQ] = useState<string>("");
    const [cls, setCls] = useState<SpellClass>("wizard");
    const [lvl, setLvl] = useState<SpellLevel | "all">("all");

    const base: Spell[] = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return SPELLS
            .filter((s: Spell) => {
                const passClass = s.classes.includes(cls);
                const passText = !qq || s.name.toLowerCase().includes(qq) || (s.desc?.toLowerCase().includes(qq) ?? false);
                return passClass && passText;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [q, cls]);

    const filtered: Spell[] = useMemo(() => {
        if (lvl === "all") return base;
        return base.filter((s: Spell) => s.level === lvl);
    }, [base, lvl]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-4">
                <h1 className="text-3xl font-black tracking-tight">Spells</h1>
                <p className="text-slate-400">Filtra por clase, nivel y texto. Haz clic para ver detalle.</p>
                <div className="flex gap-2">
                    <Link to="/" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">
                        ← Home
                    </Link>

                </div>
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
                        {ALL_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Nivel</label>
                    <select
                        value={String(lvl)}
                        onChange={(e) => setLvl(e.target.value === "all" ? "all" : (Number(e.target.value) as SpellLevel))}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                    >
                        <option value="all">Todos</option>
                        {ALL_LEVELS.map((L) => <option key={L} value={L}>{L === 0 ? "Trucos (0)" : `Nivel ${L}`}</option>)}
                    </select>
                </div>
            </section>

            {/* Grid de tarjetas simples */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((s: Spell) => (
                    <SpellCard key={s.id} spell={s} />
                ))}
                {filtered.length === 0 && (
                    <p className="text-sm text-slate-400">No hay conjuros que coincidan con el filtro.</p>
                )}
            </section>
        </div>
    );
}