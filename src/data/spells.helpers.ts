import type { Spell, SpellByClassMap, SpellClass, SpellLevel } from "./spell-types";

export const toId = (name: string): string =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const sortByName = (a: Spell, b: Spell) => a.name.localeCompare(b.name);

export function indexByClassAndLevel(spells: Spell[]): SpellByClassMap {
    const map: SpellByClassMap = {};
    for (const s of spells) {
        for (const cls of s.classes) {
            const byLevel = (map[cls] ||= {});
            const bucket = (byLevel[s.level] ||= []);
            bucket.push(s);
        }
    }
    for (const cls of Object.keys(map) as SpellClass[]) {
        const byLevel = map[cls]!;
        for (const L of Object.keys(byLevel) as unknown as SpellLevel[]) {
            byLevel[L]!.sort(sortByName);
        }
    }
    return map;
}

function normalizeForRoll20(name: string): string {
    // 1) trim
    let s = name.trim();
    // 2) reemplaza guiones largos/raros por guion normal
    s = s.replace(/[–—−]/g, "-");
    // 3) elimina comillas y caracteres problemáticos comunes (mantén espacios)
    s = s.replace(/[“”"’']/g, "");
    // 4) colapsa espacios múltiples
    s = s.replace(/\s+/g, " ");
    return s;
}


export function formatComponents(c?: { v?: boolean; s?: boolean; m?: string }): string {
    if (!c) return "—";
    const parts: string[] = [];
    if (c.v) parts.push("V");
    if (c.s) parts.push("S");
    if (typeof c.m === "string" && c.m.trim()) parts.push(`M (${c.m})`);
    else if ("m" in c) parts.push("M");
    return parts.length ? parts.join(", ") : "—";
}

export function compendiumUrlForSpell(spell: Spell): string {
    const safe = normalizeForRoll20(spell.name);
    return `https://roll20.net/compendium/dnd5e/${encodeURIComponent(safe)}#content`;
}

export function compendiumSearchUrl(spell: Spell): string {
    const q = `${spell.name} site:roll20.net/compendium/dnd5e`;
    return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}