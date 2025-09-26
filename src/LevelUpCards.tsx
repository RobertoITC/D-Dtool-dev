import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DB } from "./data/db";
import type { ClassId, LevelInfo } from "./data/types";
import LinkCard from "./components/LinkCard";
import { slugify } from "./wiki/glossary";

/* -------------------- Small UI bits -------------------- */
function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-300">
      {children}
    </span>
    );
}

function ExpandIcon({ open }: { open: boolean }) {
    return (
        <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.178l3.71-2.95a.75.75 0 111.04 1.08l-4.25 3.38a.75.75 0 01-.94 0l-4.25-3.38a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
            />
        </svg>
    );
}

/* -------------------- Feature Link Pill -------------------- */
function FeaturePill({ name, classId }: { name: string; classId: ClassId }) {
    const nav = useNavigate();
    return (
        <button
            onClick={() =>
                nav(
                    `/wiki/${slugify(name)}?title=${encodeURIComponent(name)}&class=${encodeURIComponent(
                        classId
                    )}`
                )
            }
            className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
            title={`Open details for ${name}`}
        >
            <span>📖</span>
            <span className="font-medium">{name}</span>
        </button>
    );
}

/* -------------------- Level Row -------------------- */
function LevelRow({
                      lvl,
                      info,
                      classId,
                  }: {
    lvl: number;
    info: LevelInfo;
    classId: ClassId;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-xl border border-white/10 bg-black/30">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-3 px-3 py-2"
            >
                <div className="flex items-center gap-3 text-left">
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-xs font-bold">
                        {lvl}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">Level {lvl}</span>
                        {info.profBonus && <Tag>Prof +{info.profBonus}</Tag>}
                        {info.hitDie && <Tag>Hit Die {info.hitDie}</Tag>}
                    </div>
                </div>
                <ExpandIcon open={open} />
            </button>

            {open && (
                <div className="space-y-2 px-4 pb-3 text-sm text-slate-200">
                    <div className="flex flex-wrap gap-2">
                        {info.features.map((f, i) => (
                            <FeaturePill key={i} name={f} classId={classId} />
                        ))}
                    </div>
                    {info.notes && <p className="text-slate-400">{info.notes}</p>}
                </div>
            )}
        </div>
    );
}

/* -------------------- Class Card -------------------- */
function compendiumUrl(id: ClassId) {
    return `https://roll20.net/compendium/dnd5e/${encodeURIComponent(id)}#content`;
}

function ClassCard({ classId, maxLevel }: { classId: ClassId; maxLevel: number }) {
    const c = DB[classId];
    const lvls = c.levels;

    const rows = useMemo(() => {
        const out: { lvl: number; info: LevelInfo }[] = [];
        for (let i = 1; i <= maxLevel; i++) {
            if (lvls[i]) out.push({ lvl: i, info: lvls[i] });
        }
        return out;
    }, [lvls, maxLevel]);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.meta.color}`}>
                    {c.meta.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold">{c.meta.id}</h3>
                    <p className="text-xs text-slate-400">Level-up summary</p>
                </div>
            </div>

            {/* Compendium link */}
            <div className="mb-3">
                <LinkCard
                    href={compendiumUrl(c.meta.id as ClassId)}
                    label={`Open ${c.meta.id} in Roll20 Compendium`}
                    subtitle="Spells, features, and rules reference"
                />
            </div>

            <div className="grid gap-2">
                {rows.map(({ lvl, info }) => (
                    <LevelRow key={lvl} lvl={lvl} info={info} classId={classId} />
                ))}
            </div>
        </div>
    );
}

/* -------------------- Page -------------------- */
export default function LevelUpCards() {
    const [q, setQ] = useState("");
    const [maxLevel, setMaxLevel] = useState(5);

    const classIds = useMemo(() => {
        const ids = Object.keys(DB) as ClassId[];
        const qq = q.trim().toLowerCase();
        return qq ? ids.filter((id) => id.toLowerCase().includes(qq)) : ids;
    }, [q]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">D&D Level-Up Cards</h1>
                    <p className="text-slate-400">
                        Expand a level and click a feature to read a friendly explanation (with a compendium link).
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link to="/" className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">
                        ← Home
                    </Link>

                </div>
            </header>

            {/* Filters */}
            <section className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="min-w-56 flex-1">
                        <label className="block text-xs uppercase tracking-widest text-slate-400">
                            Search class
                        </label>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Wizard, Rogue, Fighter…"
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>
                    <div className="w-80">
                        <label className="block text-xs uppercase tracking-widest text-slate-400">
                            Show levels 1 → {maxLevel}
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={20}
                            step={1}
                            value={maxLevel}
                            onChange={(e) => setMaxLevel(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {classIds.map((id) => (
                    <ClassCard key={id} classId={id} maxLevel={maxLevel} />
                ))}
            </section>
        </div>
    );
}