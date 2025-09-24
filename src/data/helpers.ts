import { DB } from "./db";
import type {ClassId, ClassMeta, LevelInfo} from "./types";

export function getClassList(): ClassMeta[] {
    return Object.values(DB).map(({ meta }) => meta);
}

export function getLevelsForClass(c: ClassId) {
    return DB[c].levels;
}

export function getLevelInfo(c: ClassId, level: number): LevelInfo | undefined {
    return DB[c]?.levels?.[level];
}

export function searchClasses(query: string): ClassMeta[] {
    const q = query.trim().toLowerCase();
    const all = getClassList();
    if (!q) return all;
    return all.filter(m => m.id.toLowerCase().includes(q));
}