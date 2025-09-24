import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
    const nav = useNavigate();

    function choose(role: "dm" | "player") {
        if (role === "dm") nav("/dm-home", { replace: true });
        else nav("/player-home", { replace: true });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-xl backdrop-blur">
                <h1 className="text-3xl font-black tracking-tight">Welcome to D&D Tools</h1>
                <p className="mt-2 text-slate-400">Choose your role to continue</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <button
                        onClick={() => choose("dm")}
                        className="rounded-xl bg-emerald-600 px-6 py-4 text-lg font-semibold hover:bg-emerald-500"
                    >
                        Dungeon Master
                    </button>
                    <button
                        onClick={() => choose("player")}
                        className="rounded-xl bg-slate-800 px-6 py-4 text-lg font-semibold hover:bg-slate-700"
                    >
                        Player
                    </button>
                </div>
            </div>
        </div>
    );
}