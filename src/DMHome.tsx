import NavCard from "./components/NavCard";
import { Link, useNavigate } from "react-router-dom";

export default function DMHome() {
    const nav = useNavigate();

    return (
        <div className="relative mx-auto max-w-7xl px-4 py-10">

            {/* Header */}
            <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">🧙 DM Console</h1>
                    <p className="mt-1 text-slate-400">
                        Herramientas para el director: iniciativa, monstruos, música y referencias de reglas.
                    </p>
                </div>
                <button
                    onClick={() => nav("/")}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                >
                    ← Volver a Role Select
                </button>
            </header>

            {/* Primary tools */}
            <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <NavCard
                    to="/combat"
                    title="Combat Tracker"
                    subtitle="Iniciativa, turnos, condiciones y HP"
                    icon="⚔️"
                    accent="rose"
                />
                <NavCard
                    to="/dj"
                    title="Ambience DJ"
                    subtitle="Capas de sonido: música + ambiente"
                    icon="🎼"
                    accent="emerald"
                />
                <NavCard
                    to="/levels"
                    title="Level-Up Cards"
                    subtitle="Consulta rápida de progreso por clase"
                    icon="🗂️"
                    accent="amber"
                />
                <NavCard
                    to="/spells"
                    title="Spells"
                    subtitle="Busca y filtra hechizos del SRD"
                    icon="🪄"
                    accent="violet"
                />
            </section>

            {/* Utilities */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Monstruos
                    </h3>
                    <p className="text-sm text-slate-300 mb-3">
                        Usa el buscador de la página de combate para traer estadísticas (SRD). Ajusta HP y condiciones sobre la marcha.
                    </p>
                    <Link
                        to="/combat"
                        className="inline-block rounded-xl bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                    >
                        Ir al Combat Tracker →
                    </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Música & Ambiente
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li>• Combina pistas para escenas: ciudad + taberna + lluvia suave.</li>
                        <li>• Usa “Pausar todo” antes de monólogos o escenas tensas.</li>
                        <li>• Mantén el volumen maestro en 40–60% para no tapar voces.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        Reglas Rápidas
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <Link
                            to="/spells?class=cleric"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Curación
                        </Link>
                        <Link
                            to="/spells?class=wizard"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Control
                        </Link>
                        <Link
                            to="/spells?class=bard"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Soporte
                        </Link>
                        <Link
                            to="/levels"
                            className="rounded-lg bg-black/30 px-3 py-1 hover:bg-black/40"
                        >
                            Subidas de nivel
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-10 text-center text-xs text-slate-500">
                Tip: prepara presets de combate (música + lluvia + gritos lejanos) y enciéndelos con un solo click cuando inicie la batalla.
            </footer>
        </div>
    );
}