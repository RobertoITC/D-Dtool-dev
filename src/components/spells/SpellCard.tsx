// src/components/spells/SpellCard.tsx
import { Link } from "react-router-dom";
import type { Spell } from "../../data/spell-types";
import { compendiumUrlForSpell, compendiumSearchUrl } from "../../data/spells.helpers";

type Props = { spell: Spell };

// Unos emojis por nivel o escuela (puedes ampliar esta tabla)
const SCHOOL_EMOJI: Record<string, string> = {
    Evocation: "💥",
    Conjuration: "✨",
    Necromancy: "💀",
    Abjuration: "🛡️",
    Divination: "🔮",
    Transmutation: "⚙️",
    Enchantment: "🧠",
    Illusion: "🎭",
};

export default function SpellCard({ spell }: Props) {
    const emoji = SCHOOL_EMOJI[spell.school] || "📜";

    return (
        <Link
            to={`/spells/${spell.id}`}
            className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3 hover:bg-emerald-600/20 transition-colors group"
        >
            {/* Nombre + emojis */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="font-bold text-lg flex items-center gap-2">
                        <span>{emoji}</span>
                        {spell.name}
                    </div>
                    <div className="text-xs text-slate-400">
                        {spell.level === 0 ? "Truco (0)" : `Nivel ${spell.level}`} • {spell.school}
                    </div>
                </div>

                {/* Links externos */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                        href={compendiumUrlForSpell(spell)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                        title="Abrir en Compendio de Roll20"
                        onClick={(e) => e.stopPropagation()} // no interrumpir navegación interna
                    >
                        📖
                    </a>
                    <a
                        href={compendiumSearchUrl(spell)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                        title="Buscar en Roll20 (fallback)"
                        onClick={(e) => e.stopPropagation()}
                    >
                        🔎
                    </a>
                </div>
            </div>
        </Link>
    );
}