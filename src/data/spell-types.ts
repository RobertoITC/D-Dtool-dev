export type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SpellClass =
    | "bard" | "cleric" | "druid" | "paladin" | "ranger"
    | "sorcerer" | "warlock" | "wizard" | "artificer";

export type Spell = {
    id: string;               // slug único (del API: index)
    name: string;
    level: SpellLevel;
    school: string;
    classes: SpellClass[];
    casting_time?: string;
    range?: string;
    duration?: string;
    concentration?: boolean;
    ritual?: boolean;
    components?: { v?: boolean; s?: boolean; m?: string };
    desc?: string;            // texto SRD/compendio
};

export type SpellDB = Spell[];

export type SpellByClassMap = {
    [K in SpellClass]?: Partial<Record<SpellLevel, Spell[]>>;
};

export type ClassSpellList = SpellByClassMap;