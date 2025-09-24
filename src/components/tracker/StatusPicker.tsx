
const COMMON = [
    "Blinded","Charmed","Deafened","Frightened","Grappled","Incapacitated",
    "Invisible","Paralyzed","Petrified","Poisoned","Prone","Restrained","Stunned","Unconscious"
];

export default function StatusPicker({
                                 statuses, onToggle, onAddCustom
                             }:{
    statuses: string[];
    onToggle: (s: string) => void;
    onAddCustom?: (s: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {COMMON.map((s) => {
                const on = statuses.includes(s);
                return (
                    <button
                        key={s}
                        onClick={() => onToggle(s)}
                        className={`rounded-lg px-2 py-1 text-xs ${on ? "bg-rose-600" : "bg-slate-800 hover:bg-slate-700"}`}
                    >
                        {s}
                    </button>
                );
            })}
            {onAddCustom && (
                <button
                    onClick={() => {
                        const x = prompt("Custom status:");
                        if (x && x.trim()) onAddCustom(x.trim());
                    }}
                    className="rounded-lg bg-slate-700 px-2 py-1 text-xs hover:bg-slate-600"
                >
                    + Custom
                </button>
            )}
        </div>
    );
}