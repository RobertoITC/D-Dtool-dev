import React from "react";
import { Link } from "react-router-dom";

function Card({ to, title, subtitle, icon }: { to: string; title: string; subtitle: string; icon: string }) {
    return (
        <Link
            to={to}
            className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:shadow-lg hover:shadow-emerald-600/10"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/90 ring-1 ring-white/10">
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="font-semibold text-slate-100 group-hover:text-white">{title}</div>
                    <div className="text-sm text-slate-400">{subtitle}</div>
                </div>
            </div>
        </Link>
    );
}

export default function PlayerHome() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="mb-6 text-3xl font-black tracking-tight">Player Tools</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card to="/levels" title="Level-Up Cards" subtitle="See what your class gains on level up" icon="🧙‍♂️" />
                <Card to="/spells" title="Spells Browser" subtitle="Search all SRD spells by class & level" icon="📜" />
            </div>
        </div>
    );
}