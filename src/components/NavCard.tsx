import { Link } from "react-router-dom";

type Props = {
    to: string;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    accent?: "emerald" | "sky" | "violet" | "rose" | "amber" | "slate";
};

const ACCENT: Record<NonNullable<Props["accent"]>, string> = {
    emerald: "from-emerald-500/20 to-emerald-500/0 ring-emerald-500/30",
    sky:     "from-sky-500/20 to-sky-500/0 ring-sky-500/30",
    violet:  "from-violet-500/20 to-violet-500/0 ring-violet-500/30",
    rose:    "from-rose-500/20 to-rose-500/0 ring-rose-500/30",
    amber:   "from-amber-500/20 to-amber-500/0 ring-amber-500/30",
    slate:   "from-slate-500/20 to-slate-500/0 ring-slate-500/30",
};

export default function NavCard({
                                    to, title, subtitle, icon, accent = "slate",
                                }: Props) {
    return (
        <Link
            to={to}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 ring-1 ring-inset hover:bg-white/10 transition
      ${ACCENT[accent]}`}
        >
            {/* glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/30 text-xl">
                    {icon ?? "✨"}
                </div>
                <div className="min-w-0">
                    <div className="truncate text-base font-semibold">{title}</div>
                    {subtitle && <div className="truncate text-xs text-slate-400">{subtitle}</div>}
                </div>
            </div>
        </Link>
    );
}