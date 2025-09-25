// src/data/spell-types.ts

// Niveles de conjuro (SRD)
export type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// Clases que pueden aparecer en tu DB.
// Incluye artificer por si tu script lo genera; si no lo usas, puedes quitarlo.
export type SpellClass =
    | "bard"
    | "cleric"
    | "druid"
    | "paladin"
    | "ranger"
    | "sorcerer"
    | "warlock"
    | "wizard"
    | "artificer";

// Conjuro base
export type Spell = {
  id: string;                 // slug único
  name: string;
  level: SpellLevel;
  school: string;
  classes: SpellClass[];      // clases que lo conocen
  components?: { v?: boolean; s?: boolean; m?: string };
  casting_time?: string;
  range?: string;
  duration?: string;
  concentration?: boolean;
  ritual?: boolean;
  desc?: string;              // texto SRD/compendio
};

// DB “plana”: lista de conjuros
export type SpellDB = Spell[];

// Mapa por clase → nivel → lista
export type SpellByClassMap = {
  [K in SpellClass]?: Partial<Record<SpellLevel, Spell[]>>;
};

// Alias para compatibilidad con módulos que esperan este nombre
export type ClassSpellList = SpellByClassMap;