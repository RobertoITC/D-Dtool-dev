// src/components/tracker/InitiativeBar.tsx
import { useEffect, useMemo, useState } from "react";

/** Minimal actor shape that the tracker needs */
export type Actor = {
    id: string;
    name: string;
    init: number;       // initiative value (higher first)
    hp?: number;
    isPC?: boolean;
};

/** Props
 * - `actors` is required.
 * - The rest are optional to keep compatibility with an existing page
 *   that was passing these props.
 */
export type Props = {
    actors: Actor[];
    onChangeOrder?: (ordered: Actor[]) => void;

    /** Optional/compat props your page might pass. They are ignored by this component,
     *  but adding them here keeps TypeScript happy. */
    orderIndex?: number;
    round?: number;
    setOrderIndex?: React.Dispatch<React.SetStateAction<number>>;
    setRound?: React.Dispatch<React.SetStateAction<number>>;
    onAdd?: (c: any) => void;
    onSort?: () => void;
    onClear?: () => void;
};

export default function InitiativeBar({ actors, onChangeOrder }: Props) {
    // Stable order (desc by initiative, then by name). Memoized for performance.
    const ordered = useMemo<Actor[]>(() => {
        const xs = [...actors];
        xs.sort((a, b) => {
            const d = b.init - a.init;
            if (d !== 0) return d;
            return a.name.localeCompare(b.name);
        });
        return xs;
    }, [actors]);

    // Local round/turn state (independent from external page state)
    const [round, setRound] = useState<number>(1);
    const [turnIndex, setTurnIndex] = useState<number>(0);

    const total = ordered.length;

    // Notify parent whenever ordering changes
    useEffect(() => {
        onChangeOrder?.(ordered);
        // When list of actors changes (add/remove/sort), clamp current turn index
        if (turnIndex >= ordered.length) {
            setTurnIndex(Math.max(0, ordered.length - 1));
        }
    }, [ordered, onChangeOrder, turnIndex]);

    function prevTurn() {
        if (total === 0) return;
        setTurnIndex((i) => {
            const next = (i - 1 + total) % total;
            // if we wrapped, decrement round (never below 1)
            if (next === total - 1) setRound((r) => Math.max(1, r - 1));
            return next;
        });
    }

    function nextTurn() {
        if (total === 0) return;
        setTurnIndex((i) => {
            const next = (i + 1) % total;
            // if we wrapped back to 0, increment round
            if (next === 0) setRound((r) => r + 1);
            return next;
        });
    }

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            {/* Header: round + controls */}
            <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-semibold">
                    Ronda{" "}
                    <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded bg-black/30 px-2">
            {round}
          </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={prevTurn}
                        className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700"
                    >
                        ← Anterior
                    </button>
                    <button
                        onClick={nextTurn}
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-500"
                    >
                        Siguiente →
                    </button>
                </div>
            </div>

            {/* Order list */}
            {total === 0 ? (
                <p className="text-sm text-slate-400">No hay combatientes.</p>
            ) : (
                <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {ordered.map((a, idx) => {
                        const active = idx === turnIndex;
                        return (
                            <li
                                key={a.id}
                                className={`rounded-lg border px-3 py-2 ${
                                    active
                                        ? "border-emerald-600/40 bg-emerald-600/15"
                                        : "border-white/10 bg-black/30"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded bg-white/10 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{a.name}</span>
                  </span>
                                    <span
                                        className={`text-xs ${
                                            active ? "text-emerald-300" : "text-slate-400"
                                        }`}
                                        title="Iniciativa"
                                    >
                    INIT {a.init}
                  </span>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            )}
        </div>
    );
}