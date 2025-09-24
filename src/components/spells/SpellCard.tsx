import { useState } from "react";
import type { Spell } from "../../data/spell-types";
import { compendiumUrlForSpell } from "../../data/spells.helpers";
import LinkCard from "../LinkCard";

export default function SpellCard({ spell }: { spell: Spell }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-xl border border-white/10 bg-black/30">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex w-full items-center justify-between gap-3 px-3 py-2"
            >
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-semibold">{spell.id}</span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-300">
              {spell.school}
            </span>
                        {spell.ritual && (
                            <span className="rounded-md bg-indigo-600/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white">
                Ritual
              </span>
                        )}
                        {spell.concentration && (
                            <span className="rounded-md bg-rose-600/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white">
                Concentration
              </span>
                        )}
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-300">{spell.short}</p>
                </div>
                <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.178l3.71-2.95a.75.75 0 111.04 1.08l-4.25 3.38a.75.75 0 01-.94 0l-4.25-3.38a.75.75 0 01-.02-1.06z" clipRule="evenodd"/>
                </svg>
            </button>
            {open && (
                <div className="space-y-2 px-4 pb-3 text-sm text-slate-200">
                    <div className="grid gap-1 text-xs text-slate-300">
                        <div><span className="text-slate-400">Level:</span> {spell.level === 0 ? "Cantrip" : spell.level}</div>
                        <div><span className="text-slate-400">Casting Time:</span> {spell.castingTime}</div>
                        <div><span className="text-slate-400">Range:</span> {spell.range}</div>
                        <div><span className="text-slate-400">Duration:</span> {spell.duration}</div>
                        <div><span className="text-slate-400">Components:</span> {spell.components}</div>
                    </div>
                    <div className="pt-2">
                        <LinkCard
                            href={compendiumUrlForSpell(spell.id)}
                            label={`Open “${spell.id}” in Compendium`}
                            subtitle="Full rules text on Roll20"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}