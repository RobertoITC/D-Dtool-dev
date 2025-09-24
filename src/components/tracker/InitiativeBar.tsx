import { useEffect, useMemo, useState } from "react";
import type { Combatant } from "../../data/monster-types";
import { searchMonsters, getMonsterByRef, getMonsterByName } from "../../services/monsters";

type AddMode = "player" | "monster" | "npc";

export default function InitiativeBar({
                                  orderIndex, round, setOrderIndex, setRound, onAdd, onSort, onClear
                              }:{
    orderIndex: number; round: number;
    setOrderIndex: (n: number) => void; setRound: (n: number) => void;
    onAdd: (c: Combatant) => void; onSort: () => void; onClear: () => void;
}) {
    const [mode, setMode] = useState<AddMode>("player");
    const [name, setName] = useState("");
    const [init, setInit] = useState<number>(10);
    const [hp, setHp] = useState<number>(10);
    const [ac, setAc] = useState<number>(10);
    const [suggestions, setSuggestions] = useState<{ name: string; ref: any }[]>([]);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        let stop = false;
        (async () => {
            if (mode !== "monster" || name.trim().length < 2) { setSuggestions([]); return; }
            try {
                const picks = await searchMonsters(name);
                if (!stop) setSuggestions(picks);
            } catch { if (!stop) setSuggestions([]); }
        })();
        return () => { stop = true; };
    }, [mode, name]);

    async function addCombatant() {
        setBusy(true);
        try {
            if (mode === "monster") {
                // Try resolve by suggestions or direct name
                let mon = null;
                if (suggestions.length) {
                    mon = await getMonsterByRef(suggestions[0].ref);
                } else {
                    mon = await getMonsterByName(name);
                }
                const baseHp = mon?.hp ?? hp;
                const c: Combatant = {
                    id: crypto.randomUUID(),
                    name: mon?.id ?? (name || "Monster"),
                    type: "monster",
                    initiative: init,
                    maxHp: baseHp,
                    hp: baseHp,
                    ac: mon?.ac ?? ac,
                    statuses: [],
                    meta: { size: mon?.size, type: mon?.type, cr: mon?.cr },
                };
                onAdd(c);
                // reset only name to add multiples quickly
                setName("");
            } else {
                const c: Combatant = {
                    id: crypto.randomUUID(),
                    name: name || (mode === "npc" ? "NPC" : "Player"),
                    type: mode,
                    initiative: init,
                    maxHp: hp,
                    hp: hp,
                    ac,
                    statuses: [],
                };
                onAdd(c);
                setName("");
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <button onClick={() => { setOrderIndex(0); setRound(1); }} className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">Start</button>
                    <button onClick={() => setOrderIndex(i => i + 1)} className="rounded-lg bg-emerald-600 px-3 py-1 text-sm font-semibold hover:bg-emerald-500">Next</button>
                    <button onClick={() => setOrderIndex(i => Math.max(0, i - 1))} className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">Prev</button>
                    <div className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-xs text-slate-300">Turn: {orderIndex + 1}</div>
                    <div className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-slate-300">Round: {round}</div>
                    <button onClick={() => setRound(r => r + 1)} className="rounded-lg bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700">+Round</button>
                    <button onClick={() => setRound(r => Math.max(1, r - 1))} className="rounded-lg bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700">-Round</button>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <button onClick={onSort} className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">Sort by Initiative</button>
                    <button onClick={onClear} className="rounded-lg bg-rose-700 px-3 py-1 text-sm hover:bg-rose-600">Clear</button>
                </div>
            </div>

            <div className="mt-2 grid gap-2 md:grid-cols-12">
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Type</label>
                    <select value={mode} onChange={(e)=>setMode(e.target.value as AddMode)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm">
                        <option value="player">Player</option>
                        <option value="npc">NPC</option>
                        <option value="monster">Monster</option>
                    </select>
                </div>
                <div className="md:col-span-4">
                    <label className="block text-xs uppercase tracking-widest text-slate-400">{mode === "monster" ? "Monster name" : "Name"}</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} placeholder={mode === "monster" ? "Goblin, Adult Red Dragon…" : "Arannis, Serena…"} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" />
                    {mode === "monster" && suggestions.length > 0 && (
                        <div className="mt-1 max-h-40 overflow-auto rounded-xl border border-white/10 bg-black/40 text-sm">
                            {suggestions.map(s => (
                                <button key={(s.ref.index || s.ref.slug || s.name)} onClick={() => setName(s.name)} className="block w-full truncate px-3 py-1 text-left hover:bg-white/10">
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-400">Initiative</label>
                    <input type="number" value={init} onChange={(e)=>setInit(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-400">HP</label>
                    <input type="number" value={hp} onChange={(e)=>setHp(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-400">AC</label>
                    <input type="number" value={ac} onChange={(e)=>setAc(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-12">
                    <button disabled={busy} onClick={addCombatant} className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-60">
                        {busy ? "Adding…" : "Add to Tracker"}
                    </button>
                </div>
            </div>
        </section>
    );
}