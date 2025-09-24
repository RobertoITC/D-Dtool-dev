import type { Spell } from "../../data/spell-types";
import SpellCard from "./SpellCard";

export function SpellList({
                              groups,
                          }:{
    groups: Record<number, Spell[]>;
}) {
    const levels = Object.keys(groups).map(n=>Number(n)).sort((a,b)=>a-b);
    if (levels.length === 0) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-400">
                No spells match your filters.
            </div>
        );
    }
    return (
        <div className="grid gap-6">
            {levels.map(level => (
                <div key={level}>
                    <div className="mb-2 flex items-center gap-2">
                        <div className="text-lg font-bold">{level===0 ? "Cantrips" : `Level ${level}`}</div>
                        <div className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-slate-300">{groups[level].length} spell(s)</div>
                    </div>
                    <div className="grid gap-2">
                        {groups[level].map(s => <SpellCard key={s.id} spell={s} />)}
                    </div>
                </div>
            ))}
        </div>
    );
}