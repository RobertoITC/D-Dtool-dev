import { useEffect, useState } from "react";

type Actor = {
    id: string;
    name: string;
    init: number;
    hp?: number;
    isPC?: boolean;
};

type Props = {
    actors: Actor[];
    onChangeOrder?: (ordered: Actor[]) => void;
};

export default function InitiativeBar({ actors, onChangeOrder }: Props) {
    // 👇 estados numéricos (no funciones)
    const [round, setRound] = useState<number>(1);
    const [turnIndex, setTurnIndex] = useState<number>(0);

    // ordenar por iniciativa desc, estable
    const ordered = [...actors].sort((a, b) => (b.init - a.init) || a.name.localeCompare(b.name));

    useEffect(() => {
        onChangeOrder?.(ordered);
    }, [ordered, onChangeOrder]);

    const total = ordered.length;

    function prevTurn() {
        if (total === 0) return;
        setTurnIndex((i) => {
            const next = (i - 1 + total) % total;
            // si damos la vuelta hacia atrás, baja de ronda pero nunca < 1
            if (next === total - 1) setRound((r) => Math.max(1, r - 1));
            return next;
        });
    }

    function nextTurn() {
        if (total === 0) return;
        setTurnIndex((i) => {
            const next = (i + 1) % total;
            // si volvemos a 0, sube ronda
            if (next === 0) setRound((r) => r + 1);
            return next;
        });
    }

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-semibold">Ronda {round}</div>
                <div className="flex gap-2">
                    <button onClick={prevTurn} className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">
                        ← Anterior
                    </button>
                    <button onClick={nextTurn} className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-500">
                        Siguiente →
                    </button>
                </div>
            </div>

            <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {ordered.map((a, idx) => (
                    <li
                        key={a.id}
                        className={`rounded-lg px-3 py-2 ${idx === turnIndex ? "bg-emerald-600/20 border border-emerald-600/40" : "bg-black/30 border border-white/10"}`}
                    >
                        <div className="flex items-center justify-between">
              <span className="truncate">
                <span className="text-xs text-slate-400">#{idx + 1}</span>{" "}
                  <span className="font-medium">{a.name}</span>
              </span>
                            <span className="text-xs text-slate-400">INIT {a.init}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}