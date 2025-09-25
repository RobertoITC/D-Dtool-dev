import type { Spell, SpellByClassMap, SpellClass, SpellLevel } from "./spell-types";
// Ordena por nombre
export function sortByName(a: Spell, b: Spell): number {
    return a.name.localeCompare(b.name);
}

// Indexa por clase y nivel
export function indexByClassAndLevel(spells: Spell[]): SpellByClassMap {
    const map: SpellByClassMap = {};
    for (const s of spells) {
        for (const cls of s.classes) {
            const byLevel = (map[cls] ||= {});
            const bucket = (byLevel[s.level] ||= []);
            bucket.push(s);
        }
    }
    // ordena cada bucket
    for (const cls of Object.keys(map) as SpellClass[]) {
        const byLevel = map[cls]!;
        for (const lvl of Object.keys(byLevel) as unknown as SpellLevel[]) {
            byLevel[lvl]!.sort(sortByName);
        }
    }
    return map;
}

// Util para construir IDs/anchors
export const toId = (name: string): string =>
    name.toLowerChttps://github.com/RobertoITC/D-Dtool-dev.gitase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");