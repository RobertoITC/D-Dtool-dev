import React from "react";
import { Link } from "react-router-dom";

function FeatureCard({
                         to,
                         title,
                         subtitle,
                         icon,
                     }: {
    to: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}) {
    return (
        <Link
            to={to}
            className="group block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:shadow-lg hover:shadow-emerald-600/10"
        >
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/90 ring-1 ring-white/10">
                    <span className="text-xl">{icon}</span>
                </div>
                <div className="min-w-0">
                    <div className="font-semibold text-slate-100 group-hover:text-white">
                        {title}
                    </div>
                    <div className="text-sm text-slate-400">{subtitle}</div>
                </div>
                <svg
                    viewBox="0 0 24 24"
                    className="ml-auto h-5 w-5 text-slate-300 opacity-70 transition group-hover:opacity-100"
                >
                    <path
                        fill="currentColor"
                        d="M9.29 6.71 13.58 11l-4.29 4.29L10 17l6-6-6-6z"
                    />
                </svg>
            </div>
        </Link>
    );
}

export default function Home() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-black tracking-tight">D&D Toolkit</h1>
                <p className="mt-2 text-slate-400">
                    Ambient sound mixing, level-up cheat cards, and a searchable spells
                    compendium — all in one place.
                </p>
            </header>

            {/* Hero CTA */}
            <div className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <FeatureCard
                        to="/dj"
                        title="Ambience DJ"
                        subtitle="Blend YouTube/HTML5 ambience, crossfade, solo/mute, presets."
                        icon={<span>🎚️</span>}
                    />
                    <FeatureCard
                        to="/levels"
                        title="Level-Up Cards"
                        subtitle="Pretty expandable class cards, levels 1–20, with Compendium links."
                        icon={<span>🧙‍♂️</span>}
                    />
                    <FeatureCard
                        to="/spells"
                        title="Spells Browser"
                        subtitle="All SRD spells by class & level, searchable, with links."
                        icon={<span>📜</span>}
                    />
                </div>

                {/* Tip row */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                    Tip: Add your favorite ambience as a preset in{" "}
                    <Link to="/dj" className="text-emerald-400 underline underline-offset-4">
                        Ambience DJ
                    </Link>{" "}
                    and share it with your table.
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-10 text-center text-xs text-slate-500">
                Built with React + TypeScript + Tailwind. You can customize colors,
                icons, and data sources anytime.
            </footer>
        </div>
    );
}