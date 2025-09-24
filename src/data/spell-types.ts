import type { ClassId } from "./types";

export type SpellId = string;

export type School =
    | "Abjuration" | "Conjuration" | "Divination" | "Enchantment"
    | "Evocation"  | "Illusion"    | "Necromancy" | "Transmutation";

export interface Spell {
    id: SpellId;
    level: number;
    school: School | string;
    ritual?: boolean;
    concentration?: boolean;
    castingTime: string;
    range: string;
    duration: string;
    components: string;
    short: string;
}

export type SpellDB = Record<SpellId, Spell>;
export type ClassSpellList = Record<ClassId, Record<number, SpellId[]>>;