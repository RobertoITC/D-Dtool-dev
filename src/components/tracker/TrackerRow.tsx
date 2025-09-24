import type { Combatant } from "../../data/monster-types";
import StatusPicker from "./StatusPicker";

export default function TrackerRow({
                               c, active, onChange, onRemove, onDamage, onHeal
                           }:{
    c: Combatant;
    active?: boolean;
    onChange: (patch: Partial<Combatant>) => void;
    onRemove: () => void;
    onDamage: (n: number) => void;
    onHeal: (n: number) => void;
}) {
    return (
        <div className={`rounded-2xl border ${active ? "border-emerald-500" : "border-white/10"} bg-white/5 p-3`}>
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${c.type === "player" ? "bg-emerald-600" : c.type === "npc" ? "bg-indigo-600" : "bg-rose-600"}`}>
            {c.name.charAt(0).toUpperCase()}
          </span>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{c.name}</div>
                        <div className="text-[11px] text-slate-400">
                            Init {c.initiative}{c.ac ? ` • AC ${c.ac}` : ""}{c.meta?.cr ? ` • CR ${c.meta.cr}` : ""}
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <label className="text-xs text-slate-400">HP</label>
                    <button onClick={() => onDamage(1)} className="rounded bg-slate-800 px-2 text-sm hover:bg-slate-700">-1</button>
                    <button onClick={() => onDamage(5)} className="rounded bg-slate-800 px-2 text-sm hover:bg-slate-700">-5</button>
                    <input
                        type="number"
                        value={c.hp}
                        onChange={(e) => onChange({ hp: Number(e.target.value) })}
                        className="w-20 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-sm"
                    />
                    <span className="text-xs text-slate-400">/ {c.maxHp}</span>
                    <button onClick={() => onHeal(5)} className="rounded bg-slate-800 px-2 text-sm hover:bg-slate-700">+5</button>
                    <button onClick={() => onHeal(1)} className="rounded bg-slate-800 px-2 text-sm hover:bg-slate-700">+1</button>
                </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
                <StatusPicker
                    statuses={c.statuses}
                    onToggle={(s) => {
                        const on = c.statuses.includes(s);
                        const next = on ? c.statuses.filter(x => x !== s) : [...c.statuses, s];
                        onChange({ statuses: next });
                    }}
                    onAddCustom={(s) => onChange({ statuses: [...c.statuses, s] })}
                />
                <label className="ml-auto flex items-center gap-2 text-xs">
                    <input
                        type="checkbox"
                        checked={!!c.concentration}
                        onChange={(e) => onChange({ concentration: e.target.checked })}
                    />
                    Concentration
                </label>
                <button onClick={onRemove} className="rounded-lg bg-rose-700 px-3 py-1 text-xs hover:bg-rose-600">
                    Remove
                </button>
            </div>

            {c.notes && <p className="mt-2 text-xs text-slate-400">📝 {c.notes}</p>}
        </div>
    );
}