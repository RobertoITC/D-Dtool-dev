import { ENTRIES, type WikiEntry } from "./entries";

const bySlug = new Map(ENTRIES.map(e => [e.slug.toLowerCase(), e]));
const alias = new Map<string, WikiEntry>();

for (const e of ENTRIES) {
    alias.set(e.title.toLowerCase(), e);
    e.aliases?.forEach(a => alias.set(a.toLowerCase(), e));
}

/** Try to resolve a user-facing name to an entry. */
export function findEntry(nameOrSlug: string | null | undefined): WikiEntry | null {
    if (!nameOrSlug) return null;
    const s = nameOrSlug.trim().toLowerCase();
    return bySlug.get(s) || alias.get(s) || null;
}