export type ClassId =
    | "Barbarian" | "Bard" | "Cleric" | "Druid" | "Fighter" | "Monk"
    | "Paladin" | "Ranger" | "Rogue" | "Sorcerer" | "Warlock" | "Wizard";

export type LevelInfo = {
    profBonus?: number;     // show when it bumps
    hitDie?: "d6" | "d8" | "d10" | "d12";
    features: string[];     // short, SRD-safe bullets
    notes?: string;         // optional clarifications
};

export type ClassMeta = {
    id: ClassId;
    icon: string;           // swap to SVG later if you want
    color: string;          // Tailwind color for card accent
};

export type ClassLevels = Record<number, LevelInfo>;

export type ClassDB = Record<ClassId, {
    meta: ClassMeta;
    levels: ClassLevels;
}>;

export const PROF_BONUS_BY_LEVEL: Record<number, number> = {
    1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 3, 9: 4, 10: 4,
    11: 4, 12: 4, 13: 5, 14: 5, 15: 5, 16: 5, 17: 6, 18: 6, 19: 6, 20: 6
};