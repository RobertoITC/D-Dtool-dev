export type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SpellClass =
    | "barbarian" | "bard" | "cleric" | "druid" | "fighter" | "monk"
    | "paladin" | "ranger" | "rogue" | "sorcerer" | "warlock" | "wizard"
    | "artificer";

export type Spell = {
    id: string;            // slug
    name: string;
    level: SpellLevel;
    school: string;
    classes: SpellClass[];
    components?: { v?: boolean; s?: boolean; m?: string };
    casting_time


        ?: string;
    range?: string;
    duration?: string;
    concentration?: boolean;
    ritual?: boolean;
    desc?: string;
};

export type SpellByClassMap = {
    [K in SpellClass]?: {
        [L in SpellLevel]?: Spell[];
    };
};