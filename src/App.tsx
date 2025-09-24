import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./RoleSelect";
import PlayerHome from "./PlayerHome";
import DMHome from "./DMHome";
import AmbienceDJ from "./AmbienceDJ";
import LevelUpCards from "./LevelUpCards";
import SpellsPage from "./SpellsPage";
import CombatTrackerPage from "./CombatTrackerPage";
import RuleDetailPage from "./wiki/RuleDetailPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
                <Routes>
                    <Route path="/" element={<RoleSelect />} />
                    <Route path="/player-home" element={<PlayerHome />} />
                    <Route path="/dm-home" element={<DMHome />} />
                    <Route path="/dj" element={<AmbienceDJ />} />
                    <Route path="/levels" element={<LevelUpCards />} />
                    <Route path="/spells" element={<SpellsPage />} />
                    <Route path="/combat" element={<CombatTrackerPage />} />
                    <Route path="/wiki/:slug" element={<RuleDetailPage />} />
                    <Route
                        path="*"
                        element={
                            <div className="mx-auto max-w-7xl px-4 py-10">
                                <h1 className="text-2xl font-bold">404 — Not Found</h1>
                                <p className="mt-2 text-slate-400">The page you’re looking for doesn’t exist.</p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}