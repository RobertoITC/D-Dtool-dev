/* scripts/build-spells.ts — throttled + retries for 429/5xx */

import fs from "node:fs";
import path from "node:path";

const OUT_FILE = path.resolve("src/data/spells.db.ts");

// ---- Tuning (adjust if you still see 429s) ----
const CONCURRENCY = 4;        // parallel requests
const BASE_DELAY_MS = 250;    // small pacing delay between dequeues
const MAX_RETRIES = 7;        // retry attempts for 429/5xx
const MAX_BACKOFF_MS = 15_000;

// ---- API host/prefix ----
const BASE_HOST = "https://www.dnd5eapi.co";
const API_PREFIX = "/api/2014";
const api = (p: string) => `${BASE_HOST}${API_PREFIX}${p}`;

const CLASSES = [
    "bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard",
    "fighter","rogue",
] as const;

type FiveESpellRef = { index: string; name: string; url: string };
type FiveESpell = {
    index: string; name: string; level: number;
    school: { name: string }; ritual: boolean; concentration: boolean;
    casting_time: string; range: string; duration: string;
    components: string[]; material?: string; desc?: string[]; higher_level?: string[];
};

type Spell = {
    id: string; level: number; school: string;
    ritual?: boolean; concentration?: boolean;
    castingTime: string; range: string; duration: string;
    components: string; short: string;
};

// ---------- tiny utils ----------
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

function backoffDelay(attempt: number, retryAfter?: string | null) {
    const headerMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 0;
    const expo = Math.min(MAX_BACKOFF_MS, Math.pow(2, attempt) * 250);
    const jitter = Math.floor(Math.random() * 250);
    return Math.max(headerMs, expo + jitter);
}

async function fetchJSON<T>(url: string, attempt = 0): Promise<T> {
    try {
        const r = await fetch(url);
        if (r.status === 429 || (r.status >= 500 && r.status <= 599)) {
            if (attempt >= MAX_RETRIES) throw new Error(`HTTP ${r.status} after ${attempt} retries: ${url}`);
            const retryAfter = r.headers.get("retry-after");
            const wait = backoffDelay(attempt + 1, retryAfter);
            await sleep(wait);
            return fetchJSON<T>(url, attempt + 1);
        }
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
        return (await r.json()) as T;
    } catch (e) {
        if (attempt >= MAX_RETRIES) throw e;
        // network error -> backoff and retry
        const wait = backoffDelay(attempt + 1, null);
        await sleep(wait);
        return fetchJSON<T>(url, attempt + 1);
    }
}

// Run an async mapper with limited concurrency and gentle pacing
async function mapPool<I, O>(items: I[], worker: (x: I, i: number) => Promise<O>): Promise<O[]> {
    const out: O[] = new Array(items.length);
    let next = 0;
    let active = 0;

    return new Promise((resolve, reject) => {
        const kick = async () => {
            while (active < CONCURRENCY && next < items.length) {
                const i = next++;
                active++;
                // gentle pacing to avoid bursts
                await sleep(BASE_DELAY_MS);
                worker(items[i], i)
                    .then((res) => { out[i] = res; })
                    .catch(reject)
                    .finally(() => {
                        active--;
                        if (out.filter(v => v !== undefined).length === items.length) resolve(out);
                        else kick();
                    });
            }
        };
        kick();
    });
}

// ---------- Build data ----------
async function getAllSpells(): Promise<Record<string, Spell>> {
    const list = await fetchJSON<{ count: number; results: FiveESpellRef[] }>(api("/spells"));

    // hydrate details with throttling
    const details = await mapPool(list.results, async (ref) => {
        const s = await fetchJSON<FiveESpell>(`${BASE_HOST}${ref.url}`); // ref.url already includes /api/2014
        const components = s.components.join(",") + (s.material ? ` (M: ${s.material})` : "");
        const shortPieces: string[] = [];
        if (s.desc?.length) shortPieces.push(s.desc[0]);
        if (s.higher_level?.length) shortPieces.push(`Upcast: ${s.higher_level[0]}`);
        const short = shortPieces.join(" ").replace(/\s+/g, " ").trim();
        const spell: Spell = {
            id: s.name,
            level: s.level,
            school: s.school?.name ?? "",
            ritual: s.ritual || undefined,
            concentration: s.concentration || undefined,
            castingTime: s.casting_time,
            range: s.range,
            duration: s.duration,
            components,
            short,
        };
        return spell;
    });

    // collapse to map (unique by name)
    const map: Record<string, Spell> = {};
    for (const s of details) map[s.id] = s;
    return map;
}

async function getClassSpellLists(allSpells: Record<string, Spell>) {
    const out: Record<string, Record<number, string[]>> = {};

    for (const cls of CLASSES) {
        const tryUrls = [
            api(`/classes/${cls}/spells`),
            `${BASE_HOST}/api/classes/${cls}/spells`, // fallback
        ];

        let list: { results: FiveESpellRef[] } | null = null;
        for (const u of tryUrls) {
            try { list = await fetchJSON<{ results: FiveESpellRef[] }>(u); break; } catch {}
        }
        if (!list) { out[capital(cls)] = {}; continue; }

        const grouped: Record<number, string[]> = {};
        for (const ref of list.results) {
            // IMPORTANT: use ref.name, not index (names match our SPELLS keys)
            const s = allSpells[ref.name];
            if (!s) continue; // skip non-SRD or unmapped
            (grouped[s.level] ||= []).push(ref.name);
        }
        for (const L of Object.keys(grouped)) grouped[+L].sort((a,b)=>a.localeCompare(b));
        out[capital(cls)] = grouped;
    }

    return out;
}

function capital(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

function header() {
    return `// AUTO-GENERATED FILE. Do not edit by hand.
// Run: npm run build:spells
// Source: dnd5eapi SRD (https://www.dnd5eapi.co)
// Generated: ${new Date().toISOString()}
import type { SpellDB, ClassSpellList } from "@/data/spell-types";
`;
}

function emitModule(
    spells: Record<string, Spell>,
    classLists: Record<string, Record<number, string[]>>
) {
    const names = Object.keys(spells).sort((a, b) => a.localeCompare(b));
    const esc = (v: string) => v.replace(/\\/g, "\\\\").replace(/`/g, "\\`");

    const spellsLiteral =
        `export const SPELLS: SpellDB = {\n` +
        names.map((n) => {
            const s = spells[n];
            return `  "${esc(s.id)}": { id: "${esc(s.id)}", level: ${s.level}, school: "${esc(s.school)}",` +
                `${s.ritual ? " ritual: true," : ""}${s.concentration ? " concentration: true," : ""}` +
                ` castingTime: "${esc(s.castingTime)}", range: "${esc(s.range)}", duration: "${esc(s.duration)}", components: "${esc(s.components)}", short: \`${esc(s.short)}\` },`;
        }).join("\n") +
        `\n};\n`;

    const clsIds = Object.keys(classLists).sort((a,b)=>a.localeCompare(b));
    const clsLiteral =
        `export const CLASS_SPELLS: ClassSpellList = {\n` +
        clsIds.map((cls) => {
            const lvls = classLists[cls];
            const keys = Object.keys(lvls).map(Number).sort((a,b)=>a-b);
            const body =
                "{\n" +
                keys.map((L)=>`    ${L}: ${JSON.stringify(lvls[L])},`).join("\n") +
                `\n  }`;
            return `  ${JSON.stringify(cls)}: ${body},`;
        }).join("\n") +
        `\n};\n`;

    return header() + "\n" + spellsLiteral + "\n" + clsLiteral;
}

async function main() {
    console.log("Fetching SRD spells…");
    const spells = await getAllSpells();
    console.log(`Spells: ${Object.keys(spells).length}`);

    console.log("Fetching class spell lists…");
    const classLists = await getClassSpellLists(spells);

    console.log("Writing module…");
    const ts = emitModule(spells, classLists);
    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, ts, "utf8");

    console.log(`Done → ${OUT_FILE}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});