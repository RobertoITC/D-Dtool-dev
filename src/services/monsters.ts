import type {Monster, MonsterRef} from "../data/monster-types";

const DND5E = "https://www.dnd5eapi.co/api/2014";
const OPEN5E = "https://api.open5e.com";

async function fetchJSON<T>(url: string) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
    return (await r.json()) as T;
}

function toTitle(s: string) {
    return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function mapFrom5eApi(s: any): Monster {
    // AC can be array or number
    const ac = Array.isArray(s.armor_class)
        ? (s.armor_class[0]?.value ?? s.armor_class[0] ?? undefined)
        : s.armor_class;
    const speed = s.speed
        ? Object.entries(s.speed).map(([k, v]) => `${k} ${v}`).join(", ")
        : undefined;

    return {
        id: s.name,
        size: s.size,
        type: s.type,
        alignment: s.alignment,
        ac: typeof ac === "number" ? ac : Number(ac),
        hp: s.hit_points,
        hit_dice: s.hit_dice,
        speed,
        abilities: { str: s.strength, dex: s.dexterity, con: s.constitution, int: s.intelligence, wis: s.wisdom, cha: s.charisma },
        senses: s.senses ? Object.entries(s.senses).map(([k,v])=>`${k} ${v}`).join(", ") : undefined,
        languages: s.languages,
        cr: typeof s.challenge_rating === "number" ? s.challenge_rating.toString() : s.challenge_rating,
        prof_bonus: s.prof_bonus,
        ref: { source: "dnd5eapi", index: s.index, url: `https://www.dnd5eapi.co${s.url}` },
    };
}

function mapFromOpen5e(s: any): Monster {
    return {
        id: s.name,
        size: s.size,
        type: s.type,
        alignment: s.alignment,
        ac: Number(s.armor_class?.split(" ")[0]) || undefined,
        hp: s.hit_points ? Number(s.hit_points) : undefined,
        hit_dice: s.hit_dice,
        speed: s.speed,
        abilities: { str: s.strength, dex: s.dexterity, con: s.constitution, int: s.intelligence, wis: s.wisdom, cha: s.charisma },
        senses: s.senses,
        languages: s.languages,
        cr: s.challenge_rating?.toString(),
        prof_bonus: s.proficiency_bonus ? Number(s.proficiency_bonus) : undefined,
        ref: { source: "open5e", slug: s.slug, url: s.slug ? `${OPEN5E}/monsters/${s.slug}/` : undefined },
    };
}

export async function searchMonsters(q: string): Promise<{ name: string; ref: MonsterRef }[]> {
    const query = q.trim().toLowerCase();
    if (!query) return [];

    // Try dnd5eapi search
    try {
        const res = await fetchJSON<{ results: { name: string; index: string; url: string }[] }>(`${DND5E}/monsters?name=${encodeURIComponent(query)}`);
        if (res.results?.length) {
            return res.results.slice(0, 25).map(r => ({ name: r.name, ref: { source: "dnd5eapi", index: r.index, url: `https://www.dnd5eapi.co${r.url}` } }));
        }
    } catch { /* ignore */ }

    // Fallback Open5e
    try {
        const res = await fetchJSON<{ results: any[] }>(`${OPEN5E}/monsters/?search=${encodeURIComponent(query)}&limit=25`);
        return res.results.map((m) => ({ name: m.name, ref: { source: "open5e", slug: m.slug, url: `${OPEN5E}/monsters/${m.slug}/` } }));
    } catch { /* ignore */ }

    return [];
}

export async function getMonsterByRef(ref: MonsterRef): Promise<Monster | null> {
    try {
        if (ref.source === "dnd5eapi" && ref.index) {
            const s = await fetchJSON<any>(`https://www.dnd5eapi.co/api/2014/monsters/${ref.index}`);
            return mapFrom5eApi(s);
        }
        if (ref.source === "open5e" && ref.slug) {
            const s = await fetchJSON<any>(`${OPEN5E}/monsters/${ref.slug}/`);
            return mapFromOpen5e(s);
        }
        if (ref.url) {
            const s = await fetchJSON<any>(ref.url);
            // best-effort map
            return (ref.source === "dnd5eapi") ? mapFrom5eApi(s) : mapFromOpen5e(s);
        }
    } catch {
        // fallthrough
    }
    return null;
}

export async function getMonsterByName(name: string): Promise<Monster | null> {
    const q = name.trim();
    if (!q) return null;

    // Try direct dnd5eapi index guess
    const index = q.toLowerCase().replace(/\s+/g, "-");
    try {
        const s = await fetchJSON<any>(`${DND5E}/monsters/${index}`);
        return mapFrom5eApi(s);
    } catch {
        // search APIs
    }

    const picks = await searchMonsters(q);
    if (picks.length) return getMonsterByRef(picks[0].ref);

    return null;
}