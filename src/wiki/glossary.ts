// Minimal, SRD-safe summaries for the features you already show in db.ts.
// Add more anytime; slugs must be unique.
export type WikiEntry = {
    slug: string;               // "reckless-attack"
    title: string;              // "Reckless Attack"
    short: string;              // 1–2 lines
    detail?: string;            // longer body (markdown-friendly plain text)
    tags?: string[];            // e.g., ["Barbarian", "Combat"]
    compendium?: string;        // optional external link (Roll20, etc.)
};

export const GLOSSARY: WikiEntry[] = [
    {
        slug: "rage",
        title: "Rage",
        tags: ["Barbarian", "Combat"],
        short: "Enter a battle fury for limited times per long rest.",
        detail:
            "While raging, you gain bonus damage on Strength melee attacks, resistance to bludgeoning/piercing/slashing damage, and advantage on Strength checks and saves. You can’t cast or concentrate on spells while raging. Rages last for 1 minute or until you’re knocked unconscious or you end it (no action).",
        compendium: "https://roll20.net/compendium/dnd5e/Barbarian#content",
    },
    {
        slug: "unarmored-defense",
        title: "Unarmored Defense",
        tags: ["Barbarian", "Monk", "Defense"],
        short: "Calculate AC without wearing armor.",
        detail:
            "Barbarian: AC = 10 + DEX mod + CON mod (no shield restriction).\nMonk: AC = 10 + DEX mod + WIS mod (no shield).",
        compendium: "https://roll20.net/compendium/dnd5e/Barbarian#content",
    },
    {
        slug: "reckless-attack",
        title: "Reckless Attack",
        tags: ["Barbarian", "Combat"],
        short: "You can attack recklessly to gain advantage.",
        detail:
            "On your first attack on your turn, you can decide to attack recklessly, gaining advantage on STR melee attacks that turn, but attack rolls against you have advantage until your next turn.",
        compendium: "https://roll20.net/compendium/dnd5e/Barbarian#content",
    },
    {
        slug: "danger-sense",
        title: "Danger Sense",
        tags: ["Barbarian", "Defense"],
        short: "Advantage on DEX saves vs. effects you can see.",
        compendium: "https://roll20.net/compendium/dnd5e/Barbarian#content",
    },
    {
        slug: "extra-attack",
        title: "Extra Attack",
        tags: ["Barbarian","Fighter","Monk","Paladin","Ranger"],
        short: "Attack twice instead of once when you take the Attack action.",
        detail:
            "You can make one extra weapon attack when you take the Attack action on your turn. Some classes improve this at higher levels (e.g., Fighter at 11: Extra Attack (2)).",
        compendium: "https://roll20.net/compendium/dnd5e/Fighter#content",
    },
    {
        slug: "fast-movement",
        title: "Fast Movement",
        tags: ["Barbarian","Speed"],
        short: "+10 ft. speed while not wearing heavy armor.",
        compendium: "https://roll20.net/compendium/dnd5e/Barbarian#content",
    },
    {
        slug: "jack-of-all-trades",
        title: "Jack of All Trades",
        tags: ["Bard"],
        short: "Add half proficiency (round down) to ability checks you’re not proficient in.",
        compendium: "https://roll20.net/compendium/dnd5e/Bard#content",
    },
    {
        slug: "song-of-rest",
        title: "Song of Rest",
        tags: ["Bard","Healing"],
        short: "During a short rest, allies who hear you regain extra HP on spending Hit Dice.",
        compendium: "https://roll20.net/compendium/dnd5e/Bard#content",
    },
    {
        slug: "cunning-action",
        title: "Cunning Action",
        tags: ["Rogue"],
        short: "Bonus action each turn to Dash, Disengage, or Hide.",
        compendium: "https://roll20.net/compendium/dnd5e/Rogue#content",
    },
    {
        slug: "sneak-attack",
        title: "Sneak Attack",
        tags: ["Rogue","Combat"],
        short: "Extra damage once per turn when you have advantage or an ally is adjacent (ranged/melee finesse).",
        compendium: "https://roll20.net/compendium/dnd5e/Rogue#content",
    },
    {
        slug: "spellcasting",
        title: "Spellcasting",
        tags: ["Bard","Cleric","Druid","Paladin","Ranger","Sorcerer","Warlock","Wizard"],
        short: "You can cast spells. Slots, known/prepared, and DCs vary by class.",
        compendium: "https://roll20.net/compendium/dnd5e/Spells%20List#content",
    },
    {
        slug: "divine-smite",
        title: "Divine Smite",
        tags: ["Paladin","Combat"],
        short: "When you hit with a melee weapon attack, expend a spell slot to deal radiant damage.",
        compendium: "https://roll20.net/compendium/dnd5e/Paladin#content",
    },
    {
        slug: "stunning-strike",
        title: "Stunning Strike",
        tags: ["Monk","Combat"],
        short: "Spend ki when you hit to force a CON save or stun the target until end of your next turn.",
        compendium: "https://roll20.net/compendium/dnd5e/Monk#content",
    },
    {
        slug: "arcane-recovery",
        title: "Arcane Recovery",
        tags: ["Wizard"],
        short: "Recover some spell slots on a short rest (once/day).",
        compendium: "https://roll20.net/compendium/dnd5e/Wizard#content",
    },
    {
        slug: "eldritch-invocations",
        title: "Eldritch Invocations",
        tags: ["Warlock"],
        short: "Permanent magical benefits chosen at level-up (e.g., Agonizing Blast).",
        compendium: "https://roll20.net/compendium/dnd5e/Warlock#content",
    },
    {
        slug: "fighting-style",
        title: "Fighting Style",
        tags: ["Fighter","Paladin","Ranger"],
        short: "Pick a style (e.g., Archery, Defense, Dueling) granting a passive combat bonus.",
        compendium: "https://roll20.net/compendium/dnd5e/Fighter#content",
    },
    // …add any other features you list in your class DB (ASI, Indomitable, Evasion, etc.)
];

// quick lookup
export function bySlug(slug: string) {
    return GLOSSARY.find((e) => e.slug === slug);
}
export function slugify(title: string) {
    return title
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}