import type { ClassId } from "../../data/types";

const CLASSES: ClassId[] = [
    "Barbarian","Bard","Cleric","Druid","Fighter","Monk",
    "Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard"
];

export function SpellFilters({
                                 cls, setCls, level, setLevel, q, setQ
                             }:{
    cls: ClassId; setCls: (c: ClassId) => void;
    level: number | "all"; setLevel: (n: number | "all") => void;
    q: string; setQ: (s: string) => void;
}) {
    return (
        <section className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Class</label>
                    <select
                        value={cls}
                        onChange={(e)=>setCls(e.target.value as ClassId)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                        {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Spell Level</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        <button onClick={()=>setLevel("all")} className={`rounded-lg px-3 py-1 text-sm ${level==="all" ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}>All</button>
                        {Array.from({length:10},(_,i)=>i).map(n=>(
                            <button key={n} onClick={()=>setLevel(n)} className={`rounded-lg px-3 py-1 text-sm ${level===n ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}>
                                {n===0 ? "Cantrips" : n}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Search Spells</label>
                    <input
                        value={q}
                        onChange={(e)=>setQ(e.target.value)}
                        placeholder="Fireball, Cure Wounds…"
                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600"
                    />
                </div>
            </div>
        </section>
    );
}