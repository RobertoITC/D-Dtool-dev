import { SPELLS, CLASS_SPELLS } from "./spells.db";
import type { ClassId } from "./types.ts";
import type { Spell } from "./spell-types";

export function compendiumUrlForSpell(name: string) {
    return `https://roll20.net/compendium/dnd5e/${encodeURIComponent(name)}#content`;
}

export function getSpellsForClassByLevel(cls: ClassId): Record<number, Spell[]> {
    const listing = CLASS_SPELLS[cls] || {};
    const out: Record<number, Spell[]> = {};
    for (const lvlStr of Object.keys(listing)) {
        const lvl = Number(lvlStr);
        out[lvl] = (listing[lvl] || [])
            .map((id) => SPELLS[id])
            .filter(Boolean)
            .sort((a, b) => a.id.localeCompare(b.id));
    }
    return out;
}

export function allLevelsPresent(cls: ClassId): number[] {
    return Object.keys(CLASS_SPELLS[cls] || {}).map(n => Number(n)).sort((a,b) => a-b);
}

export function searchSpellNames(query: string): string[] {
    const q = query.trim().toLowerCase();
    if (!q) return Object.keys(SPELLS);
    return Object.keys(SPELLS).filter(n => n.toLowerCase().includes(q));
}