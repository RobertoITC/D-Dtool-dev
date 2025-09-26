// src/RoleSelect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
    const nav = useNavigate();

    function go(role: "dm" | "player") {
        // recuerda la elección
        try {
            localStorage.setItem("role", role);
        } catch {}
        nav(role === "dm" ? "/dm-home" : "/player-home", { replace: true });
    }

    // Atajos de teclado: D = DM, P = Player
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            const k = e.key.toLowerCase();
            if (k === "d") go("dm");
            if (k === "p") go("player");
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* fondo bonito (usa tus imágenes en /public/bg/) */}

            <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12">
                <div className="w-full">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-black tracking-tight">
                            Bienvenido a <span className="text-emerald-400">D&D Tools</span>
                        </h1>
                        <p className="mt-2 text-slate-300">Elige tu rol para continuar</p>
                        <p className="mt-1 text-xs text-slate-500">Tips: presiona <b>D</b> para DM o <b>P</b> para Player</p>
                    </div>

                    {/* Opciones como tarjetas */}
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* DM Card */}
                        <button
                            onClick={() => go("dm")}
                            className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left ring-1 ring-inset ring-emerald-500/20 transition hover:bg-white/10 hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                        >
                            <div className="relative overflow-hidden">
                                {/* Glow decorativo */}
                                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl opacity-0 transition group-hover:opacity-100" />
                                <div className="flex items-start gap-4">
                                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600/20 text-3xl">
                                        🧙
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-2xl font-bold">Dungeon Master</h2>
                                        <p className="mt-1 text-sm text-slate-300">
                                            Consola de combate, control de música y referencias rápidas para dirigir sesiones con fluidez.
                                        </p>
                                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                            <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-emerald-300">Combat Tracker</span>
                                            <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-emerald-300">Ambience DJ</span>
                                            <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-emerald-300">Level-Up</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* Player Card */}
                        <button
                            onClick={() => go("player")}
                            className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left ring-1 ring-inset ring-sky-500/20 transition hover:bg-white/10 hover:shadow-sky-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                        >
                            <div className="relative overflow-hidden">
                                {/* Glow decorativo */}
                                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl opacity-0 transition group-hover:opacity-100" />
                                <div className="flex items-start gap-4">
                                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-600/20 text-3xl">
                                        🛡️
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-2xl font-bold">Player</h2>
                                        <p className="mt-1 text-sm text-slate-300">
                                            Hechizos por clase y nivel, tarjetas de subida de nivel y música de ambiente del party.
                                        </p>
                                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                            <span className="rounded-lg bg-sky-500/15 px-2 py-1 text-sky-300">Spells</span>
                                            <span className="rounded-lg bg-sky-500/15 px-2 py-1 text-sky-300">Level-Up Cards</span>
                                            <span className="rounded-lg bg-sky-500/15 px-2 py-1 text-sky-300">Ambience DJ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs text-slate-500">
                        Tu elección se guardará para la próxima visita.
                    </div>
                </div>
            </div>
        </div>
    );
}