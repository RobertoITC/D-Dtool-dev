import NavCard from "./components/NavCard";
import { Link, useNavigate } from "react-router-dom";

export default function PlayerHome() {
    const nav = useNavigate();

    return (
        <div className="relative mx-auto max-w-7xl px-4 py-10">

            {/* Header */}
            <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">🎲 Player Hub</h1>
                    <p className="mt-1 text-slate-400">
                        Referencias rápidas para tus personajes: hechizos y subidas de nivel.
                    </p>
                </div>
                <button
                    onClick={() => nav("/")}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                >
                    ← Volver a Role Select
                </button>
            </header>

            {/* Quick actions */}
            <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <NavCard
                    to="/spells"
                    title="Spells"
                    subtitle="Busca por clase y nivel. Detalle claro + links 📖"
                    icon="🪄"
                    accent="violet"
                />
                <NavCard
                    to="/levels"
                    title="Level-Up Cards"
                    subtitle="Qué ganas en cada nivel por clase"
                    icon="📈"
                    accent="emerald"
                />
            </section>

            {/* Tips / Info */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Sugerencias
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li>• Usa filtros por clase/nivel para encontrar hechizos más rápido.</li>
                        <li>• En Level-Up, haz click en la habilidad para ver su explicación.</li>
                        <li>• Coordínate con tu DM para que la música de ambiente no tape tu voz.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Accesos rápidos
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <Link
                            to="/spells?class=wizard"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Wizard
                        </Link>
                        <Link
                            to="/spells?class=bard"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Bard
                        </Link>
                        <Link
                            to="/spells?class=cleric"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Cleric
                        </Link>
                        <Link
                            to="/levels"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Level-Up
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Consejo de mesa
                    </h3>
                    <p className="text-sm text-slate-300">
                        Lleva registro de tus conjuros y habilidades en esta app para evitar ralentizar el juego
                        buscando en libros físicos o wikis.
                    </p>
                </div>
            </section>
        </div>
    );
}