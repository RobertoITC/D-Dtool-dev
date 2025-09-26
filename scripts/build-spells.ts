/* scripts/build-spells.ts
 * Genera src/data/spells.db.ts desde dnd5eapi.co
 * - Intenta /api/2014/spells y cae a /api/spells
 * - Maneja 429 con backoff
 * - Limita concurrencia para no ser bloqueado
 * - Filtra por SRD por defecto (configurable)
 */

// @ts-ignore

import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
type IndexItem = { index: string; name: string; url: string; srd?: boolean };
type SpellDetail = {
    index: string;
    name: string;
    level: number;
    school: { name: string } | string;
    classes?: { name: string }[];
    // 2014 schema keys
    casting_time?: string;
    range?: string;
    duration?: string;
    concentration?: boolean;
    ritual?: boolean;
    components?: string[];   // ["V","S","M"]
    material?: string;       // material text
    desc?: string[];         // array of paragraphs
    // legacy keys (fallback)
    castingTime?: string;
};



const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT = resolve(PROJECT_ROOT, "src/data/spells.db.ts");
// Config
const INCLUDE_NON_SRD = false;   // ← pon true si quieres intentar TODO (puede traer textos vacíos/no SRD)
const CONCURRENCY = 4;
const RETRIES = 5;
const BASE_BACKOFF_MS = 600;

const API_ROOTS = [
    "https://www.dnd5eapi.co/api/2014",
    "https://www.dnd5eapi.co/api",
];

async function sleep(ms: number) {

    return new Promise((r) => setTimeout(r, ms));
}

async function fetchJSON<T>(url: string, attempt = 1): Promise<T> {
    const res = await fetch(url);
    if (res.status === 429) {
        const wait = BASE_BACKOFF_MS * attempt;
        console.warn(`[429] Waiting ${wait}ms → ${url}`);
        await sleep(wait);
        if (attempt <= RETRIES) return fetchJSON<T>(url, attempt + 1);
    }
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return res.json() as Promise<T>;
}

async function firstWorkingRoot(): Promise<string> {
    for (const root of API_ROOTS) {
        try {
            const data = await fetchJSON<{ results: IndexItem[] }>(`${root}/spells`);
            if (Array.isArray(data.results)) return root;
        } catch {
            // try next
        }
    }
    throw new Error("No API root responded with /spells");
}

function schoolName(x: SpellDetail["school"]): string {
    if (!x) return "Unknown";
    return typeof x === "string" ? x : x.name;
}

function mapClasses(classes?: { name: string }[]): string[] {
    if (!classes) return [];
    return classes
        .map((c) => c.name.toLowerCase())
        .filter((n) =>
            ["bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard","artificer"].includes(n)
        );
}

function componentsObj(components?: string[], material?: string) {
    if (!components || components.length === 0) return undefined;
    const o: { v?: boolean; s?: boolean; m?: string } = {};
    if (components.includes("V")) o.v = true;
    if (components.includes("S")) o.s = true;
    if (components.includes("M")) o.m = material || "";
    return o;
}

function textJoin(desc?: string[]): string | undefined {
    if (!desc || desc.length === 0) return undefined;
    return desc.join("\n\n");
}

async function getAllIndexes(root: string): Promise<IndexItem[]> {
    const { results } = await fetchJSON<{ count: number; results: IndexItem[] }>(`${root}/spells`);
    return (results || []).filter((r) => (INCLUDE_NON_SRD ? true : r.srd !== false));
}

async function fetchDetail(root: string, idx: IndexItem): Promise<SpellDetail> {
    // Some results come with absolute url; prefer them. Else, build from index.
    const url = idx.url?.startsWith("http")
        ? idx.url
        : `${root}/spells/${idx.index}`;
    return fetchJSON<SpellDetail>(url);
}

// Simple concurrency pool
async function pool<T, R>(items: T[], limit: number, worker: (t: T) => Promise<R>): Promise<R[]> {
    const ret: R[] = [];
    let i = 0;
    const runners: Promise<void>[] = [];
    for (let c = 0; c < Math.min(limit, items.length); c++) {
        runners.push(
            (async function run() {
                while (i < items.length) {
                    const cur = items[i++];
                    try {
                        const r = await worker(cur);
                        ret.push(r);
                    } catch (e: any) {
                        console.warn("Skip item due to error:", e?.message);
                    }
                }
            })()
        );
    }
    await Promise.all(runners);
    return ret;
}

function escapeTS(str: string): string {
    return str
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`");
}

function spellToTS(s: any): string {
    // formatea objeto Spell como literal TS (backticks para desc/material)
    const comps =
        s.components
            ? `{ ${s.components.v ? "v:true, " : ""}${s.components.s ? "s:true, " : ""}${
                "m" in s.components ? `m:\`${escapeTS(s.components.m || "")}\`` : ""
            } }`.replace(/, \}/, " }")
            : "undefined";

    const desc = s.desc ? `\`${escapeTS(s.desc)}\`` : "undefined";

    return `{
    id: "${s.id}",
    name: "${escapeTS(s.name)}",
    level: ${s.level},
    school: "${escapeTS(s.school)}",
    classes: [${s.classes.map((c: string) => `"${c}"`).join(", ")}],
    casting_time: ${s.casting_time ? `"${escapeTS(s.casting_time)}"` : "undefined"},
    range: ${s.range ? `"${escapeTS(s.range)}"` : "undefined"},
    duration: ${s.duration ? `"${escapeTS(s.duration)}"` : "undefined"},
    concentration: ${s.concentration ? "true" : "false"},
    ritual: ${s.ritual ? "true" : "false"},
    components: ${comps},
    desc: ${desc},
  }`;
}

async function main() {
    console.log("Detecting API root…");
    const root = await firstWorkingRoot();
    console.log("API root:", root);

    console.log("Fetching spell index…");
    const idxs = await getAllIndexes(root);
    if (idxs.length === 0) throw new Error("No spells in index");
    console.log(`Indexes: ${idxs.length}`);

    console.log("Fetching details (concurrency:", CONCURRENCY, ")…");
    const details = await pool(idxs, CONCURRENCY, async (it) => {
        let d = await fetchDetail(root, it);
        return d;
    });

    console.log("Mapping to DB format…");
    const mapped = details
        .map((d) => {
            const id = d.index; // use API slug
            const school = schoolName(d.school);
            const classes = mapClasses(d.classes);
            const ct = d.casting_time || d.castingTime; // support both keys
            const comps = componentsObj(d.components, d.material);
            const desc = textJoin(d.desc);

            const level = (d.level ?? 0) as number;
            if (typeof level !== "number" || level < 0 || level > 9) return null;

            if (!INCLUDE_NON_SRD && desc === undefined) {
                // si no hay texto, probablemente no es SRD-iluminado. omite.
                return null;
            }

            return {
                id,
                name: d.name,
                level,
                school,
                classes,
                casting_time: ct,
                range: d.range,
                duration: d.duration,
                concentration: !!d.concentration,
                ritual: !!d.ritual,
                components: comps,
                desc,
            };
        })
        .filter(Boolean) as any[];

    // de-dup por id
    const seen = new Set<string>();
    const unique = mapped.filter((s) => {
        if (seen.has(s.id)) return false;
        seen.add(s.id);
        return true;
    });

    console.log(`Total spells mapped: ${unique.length}`);

    const file = `/* AUTO-GENERATED by scripts/build-spells.ts */
import type { SpellDB, ClassSpellList } from "./spell-types";
import { indexByClassAndLevel } from "./spells.helpers";

export const SPELLS: SpellDB = [
${unique.map(spellToTS).join(",\n")}
];

export const SPELLS_BY_CLASS: ClassSpellList = indexByClassAndLevel(SPELLS);

export default SPELLS;
`;

    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, file, "utf8");
    console.log("Wrote", OUTPUT);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});