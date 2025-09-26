import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Combatant } from "./data/monster-types";
import InitiativeBar from "./components/tracker/InitiativeBar";
import TrackerRow from "./components/tracker/TrackerRow";

const LS_KEY = "combat-tracker-v1";

function sortByInit(a: Combatant, b: Combatant) {
    if (b.initiative !== a.initiative) return b.initiative - a.initiative;
    return a.name.localeCompare(b.name);
}

export default function CombatTrackerPage() {
    const [list, setList] = useState<Combatant[]>([]);
    const [orderIndex, setOrderIndex] = useState(0);
    const [round, setRound] = useState(1);
    const [combatants] = useState<{ id: string; name: string; initiative: number }[]>([]);

    const actors = useMemo(
        () => combatants.map(c => ({ id: c.id, name: c.name, init: c.initiative })),
        [combatants]
    );
    // Load / save
    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                setList(data.list || []);
                setOrderIndex(data.orderIndex || 0);
                setRound(data.round || 1);
            }
        } catch { /* ignore */ }
    }, []);
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify({ list, orderIndex, round }));
    }, [list, orderIndex, round]);

    // Active ID
    const ordered = useMemo(() => [...list].sort(sortByInit), [list]);
    const activeId = ordered[orderIndex % Math.max(1, ordered.length)]?.id;

    function add(c: Combatant) {
        setList(prev => [...prev, c]);
    }
    function update(id: string, patch: Partial<Combatant>) {
        setList(prev => prev.map(x => x.id === id ? { ...x, ...patch } : x));
    }
    function remove(id: string) {
        setList(prev => prev.filter(x => x.id !== id));
    }
    function clear() {
        if (confirm("Clear all combatants?")) {
            setList([]); setOrderIndex(0); setRound(1);
        }
    }

    function nextTurn() {
        if (ordered.length === 0) return;
        const next = orderIndex + 1;
        setOrderIndex(next);
        if ((next % ordered.length) === 0) setRound(r => r + 1);
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Combat Tracker</h1>
                    <p className="text-slate-400">Import monsters, add players/NPCs, track initiative, turns, HP, and statuses.</p>
                </div>
                <div className="flex gap-2">
                    <Link to="/" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">← Home</Link>
                    <Link to="/dj" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">Ambience DJ</Link>
                    <Link to="/levels" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">Level-Up Cards</Link>
                    <Link to="/spells" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">Spells</Link>
                </div>
            </header>

            <InitiativeBar
                orderIndex={orderIndex}
                round={round}
                setOrderIndex={setOrderIndex}
                setRound={setRound}
                onAdd={add}
                onSort={() => setList(prev => [...prev].sort(sortByInit))}
                onClear={clear}
                actors={actors} onChangeOrder={() => {/* optional */}}
            />

            <section className="mt-4 grid gap-3">
                {ordered.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
                        No combatants yet. Add players or import monsters above.
                    </div>
                )}
                {ordered.map((c) => (
                    <TrackerRow
                        key={c.id}
                        c={c}
                        active={c.id === activeId}
                        onChange={(patch) => update(c.id, patch)}
                        onRemove={() => remove(c.id)}
                        onDamage={(n) => update(c.id, { hp: Math.max(0, c.hp - n) })}
                        onHeal={(n) => update(c.id, { hp: Math.min(c.maxHp, c.hp + n) })}
                    />
                ))}
            </section>

            {ordered.length > 0 && (
                <div className="sticky bottom-4 mt-6 flex justify-end">
                    <button
                        onClick={nextTurn}
                        className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-500"
                    >
                        Next Turn →
                    </button>
                </div>
            )}
        </div>
    );
}