import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { ClassId } from "./data/types";
import { getSpellsForClassByLevel } from "./data/spells.helpers";
import { SPELLS } from "./data/spells.db";
import { SpellList } from "./components/spells/SpellList";
import { SpellFilters } from "./components/spells/SpellFilters";

export default function SpellsPage() {
    const [cls, setCls] = useState<ClassId>("Wizard");
    const [level, setLevel] = useState<number | "all">("all");
    const [q, setQ] = useState("");

    const groups = useMemo(() => {
        // Base groups for the chosen class
        const byLevel = getSpellsForClassByLevel(cls);

        // Filter by spell level
        const levelFiltered: Record<number, typeof byLevel[0]> = {};
        const levels = level === "all" ? Object.keys(byLevel).map(Number) : [level];
        for (const L of levels) {
            const list = byLevel[L] || [];
            levelFiltered[L] = list;
        }

        // Search filter across names & short text
        const query = q.trim().toLowerCase();
        if (!query) return levelFiltered;

        const out: typeof levelFiltered = {};
        for (const L of Object.keys(levelFiltered).map(Number)) {
            out[L] = levelFiltered[L].filter(s =>
                s.id.toLowerCase().includes(query) ||
                s.short.toLowerCase().includes(query) ||
                SPELLS[s.id].school.toLowerCase().includes(query)
            );
        }
        // Drop empty groups
        for (const k of Object.keys(out)) {
            if (out[Number(k)].length === 0) delete (out as any)[k];
        }
        return out;
    }, [cls, level, q]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Spells by Class & Level</h1>
                    <p className="text-slate-400">Browse SRD-style spells per class, grouped by level. Click a spell to see details and open its Compendium page.</p>
                </div>
                <div className="flex gap-2">
                    <Link to="/" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">← Ambience DJ</Link>
                    <Link to="/levels" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">Level-Up Cards</Link>
                </div>
            </header>

            <SpellFilters cls={cls} setCls={setCls} level={level} setLevel={setLevel} q={q} setQ={setQ} />

            <SpellList groups={groups} />
        </div>
    );
}