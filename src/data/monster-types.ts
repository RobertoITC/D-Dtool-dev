export type AbilityScores = {
    str: number; dex: number; con: number; int: number; wis: number; cha: number;
};

export type MonsterRef = {
    source: "dnd5eapi" | "open5e";
    index?: string;      // dnd5eapi index (e.g. "adult-black-dragon")
    slug?: string;       // open5e slug
    url?: string;        // raw api url
};

export type Monster = {
    id: string;          // display name
    size?: string;
    type?: string;
    alignment?: string;
    ac?: number;
    hp?: number;
    hit_dice?: string;
    speed?: string;
    abilities?: AbilityScores;
    senses?: string;
    languages?: string;
    cr?: string;
    prof_bonus?: number;
    ref?: MonsterRef;
};

export type Combatant = {
    id: string;               // uid
    name: string;
    type: "player" | "monster" | "npc";
    initiative: number;
    maxHp: number;
    hp: number;
    ac?: number;
    notes?: string;
    statuses: string[];
    concentration?: boolean;
    // quick view fields (for monsters)
    meta?: {
        size?: string; type?: string; cr?: string;
    };
};