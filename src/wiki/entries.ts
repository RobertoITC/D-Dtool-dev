// Offline wiki for features/conditions/keywords.
// Keep "body" short & SRD-friendly. Add more entries freely.

export type WikiEntry = {
    slug: string;            // canonical slug, unique
    title: string;           // display title
    body: string;            // plain text (renders with \n line breaks)
    tags?: string[];         // helpful filters
    aliases?: string[];      // strings that should resolve to this entry
};

export const ENTRIES: WikiEntry[] = [
    // ===== Generic / rules =====
    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body:
            "When you gain this feature, increase one ability score by 2 or two scores by 1 (to a max of 20). Some classes can instead take a feat if allowed.",
        tags: ["All"],
        aliases: ["ASI", "Ability Score Increases"],
    },
    {
        slug: "extra-attack",
        title: "Extra Attack",
        body:
            "When you take the Attack action on your turn, you can attack twice instead of once. Some classes improve this at higher levels (e.g., Fighter gains a third attack at 11th).",
        tags: ["Combat", "Barbarian", "Fighter", "Monk", "Paladin", "Ranger"],
    },
    {
        slug: "fighting-style",
        title: "Fighting Style",
        body:
            "Choose a combat style that grants a passive bonus (e.g., Archery, Defense, Dueling). Options differ by class.",
        tags: ["Fighter", "Paladin", "Ranger"],
    },
    {
        slug: "evasion",
        title: "Evasion",
        body:
            "When you make a DEX save for half damage, you take no damage on a success and only half on a failure.",
        tags: ["Rogue", "Monk"],
    },
    {
        slug: "uncanny-dodge",
        title: "Uncanny Dodge",
        body:
            "When an attacker you can see hits you with an attack, you can use your reaction to halve the attack’s damage.",
        tags: ["Rogue"],
    },

    // ===== Conditions =====
    { slug: "prone", title: "Prone", body: "Speed 0 (except crawl). Attacks vs you have advantage if within 5 ft; your attacks have disadvantage. Ranged attacks against you have advantage if within 5 ft, otherwise normal; you have disadvantage on ranged attacks.", tags: ["Condition"] },
    { slug: "grappled", title: "Grappled", body: "Speed becomes 0. Ends if grappler is incapacitated or removed from your reach.", tags: ["Condition"] },
    { slug: "restrained", title: "Restrained", body: "Speed 0, attacks against you have advantage, your attacks have disadvantage, and you have disadvantage on DEX saves.", tags: ["Condition"] },
    { slug: "frightened", title: "Frightened", body: "Disadvantage on ability checks and attack rolls while the source of fear is in line of sight; you can’t willingly move closer to it.", tags: ["Condition"] },
    { slug: "poisoned", title: "Poisoned", body: "Disadvantage on attack rolls and ability checks.", tags: ["Condition"] },
    { slug: "stunned", title: "Stunned", body: "Incapacitated, can’t move, can speak only falteringly, automatically fail STR/DEX saves, attacks against you have advantage.", tags: ["Condition"] },
    { slug: "paralyzed", title: "Paralyzed", body: "Stunned + can’t move/speak; fail STR/DEX saves; attacks vs you have advantage and any hit within 5 ft is a crit.", tags: ["Condition"] },
    { slug: "invisible", title: "Invisible", body: "You can’t be seen. You have advantage on attacks; attacks against you have disadvantage. You still make noise/leave tracks.", tags: ["Condition"] },
    { slug: "blinded", title: "Blinded", body: "Automatically fail any ability check that requires sight. Attack rolls against you have advantage; your attack rolls have disadvantage.", tags: ["Condition"] },
    { slug: "deafened", title: "Deafened", body: "Automatically fail any ability check that requires hearing.", tags: ["Condition"] },
    { slug: "petrified", title: "Petrified", body: "Transformed into a solid inanimate substance; incapacitated, can’t move or speak, unaware of surroundings; attacks have advantage; you fail STR/DEX saves.", tags: ["Condition"] },
    { slug: "unconscious", title: "Unconscious", body: "Incapacitated, can’t move or speak; drop what you’re holding; prone; fail STR/DEX saves; attacks vs you have advantage and are crits within 5 ft.", tags: ["Condition"] },
    { slug: "grapple", title: "Grapple", body: "To grapple, use the Attack action to make a STR (Athletics) check vs target’s STR (Athletics) or DEX (Acrobatics). On a success, you impose the Grappled condition.", tags: ["Rules"], aliases: ["Grappling"] },

    // ===== Barbarian =====
    {
        slug: "rage",
        title: "Rage",
        body: "Bonus action: enter a battle fury. While raging: bonus damage on STR melee attacks; resistance to bludgeoning, piercing, and slashing damage; advantage on STR checks and saves. Lasts 1 minute. Uses per long rest scale with level.",
        tags: ["Barbarian", "Combat"],
    },
    {
        slug: "unarmored-defense",
        title: "Unarmored Defense",
        body: "AC = 10 + DEX mod + CON mod while not wearing armor (shield allowed).",
        tags: ["Barbarian", "Defense"],
    },
    {
        slug: "reckless-attack",
        title: "Reckless Attack",
        body: "When you make your first attack on your turn, you can choose to gain advantage on STR melee attacks that turn, but attack rolls against you have advantage until your next turn.",
        tags: ["Barbarian", "Combat"],
    },
    {
        slug: "danger-sense",
        title: "Danger Sense",
        body: "Advantage on DEX saves vs effects you can see, not while blinded, deafened, or incapacitated.",
        tags: ["Barbarian"],
    },
    {
        slug: "primal-path",
        title: "Primal Path (Subclass)",
        body: "At 3rd level, choose a Primal Path (e.g., Berserker, Totem Warrior). Grants subclass features at levels 3, 6, 10, 14.",
        tags: ["Barbarian", "Subclass"],
    },
    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Increase one ability score by 2 or two scores by 1 (max 20). Some tables allow feats instead.",
        tags: ["All"],
        aliases: ["ASI"],
    },
    {
        slug: "extra-attack",
        title: "Extra Attack",
        body: "When you take the Attack action on your turn, you can attack twice instead of once.",
        tags: ["Barbarian", "Combat"],
    },
    {
        slug: "fast-movement",
        title: "Fast Movement",
        body: "+10 ft movement speed while not wearing heavy armor.",
        tags: ["Barbarian"],
    },
    {
        slug: "feral-instinct",
        title: "Feral Instinct",
        body: "Advantage on initiative rolls. If surprised, you can act normally on your first turn if you enter Rage first.",
        tags: ["Barbarian"],
    },
    {
        slug: "brutal-critical",
        title: "Brutal Critical",
        body: "When you score a melee weapon crit, roll one extra damage die (increases to 2 extra dice at 13th, 3 dice at 17th).",
        tags: ["Barbarian"],
    },
    {
        slug: "relentless-rage",
        title: "Relentless Rage",
        body: "While raging, if reduced to 0 HP but not killed outright, you can make a CON save (DC 10, +5 each time after) to drop to 1 HP instead.",
        tags: ["Barbarian"],
    },
    {
        slug: "persistent-rage",
        title: "Persistent Rage",
        body: "Your rage ends only if you fall unconscious or you choose to end it.",
        tags: ["Barbarian"],
    },
    {
        slug: "indomitable-might",
        title: "Indomitable Might",
        body: "If your total for a STR check is less than your STR score, you can use that score instead.",
        tags: ["Barbarian"],
    },
    {
        slug: "primal-champion",
        title: "Primal Champion",
        body: "At 20th level, STR and CON increase by 4 (max 24).",
        tags: ["Barbarian", "Capstone"],
    },
    // ===== Bard =====
    {
        slug: "bardic-inspiration",
        title: "Bardic Inspiration",
        body: "Bonus action: una criatura (no tú) dentro de 60 ft recibe un dado de Inspiración (d6 que escala hasta d12). El objetivo puede añadirlo a una tirada de ataque, salvación o chequeo de habilidad, después de tirar pero antes de saber el resultado.",
        tags: ["Bard", "Support"],
    },

    {
        slug: "spellcasting",
        title: "Spellcasting (Bard)",
        body: "Como bardo, aprendes y lanzas conjuros de la lista de bardos usando Carisma. Conoces un número limitado de conjuros, tienes espacios de conjuro y el DC de tus conjuros es 8 + bono de competencia + CAR mod.",
        tags: ["Bard", "Magic"],
    },

    {
        slug: "jack-of-all-trades",
        title: "Jack of All Trades",
        body: "A partir de 2º nivel, agregas la mitad de tu bono de competencia (redondeado hacia abajo) a cualquier chequeo de habilidad que no incluya ya tu bono de competencia.",
        tags: ["Bard"],
    },

    {
        slug: "song-of-rest",
        title: "Song of Rest",
        body: "Durante un descanso corto, tú y las criaturas amigas que puedan oírte recuperan HP adicionales al gastar Dados de Golpe. La curación adicional escala con el nivel de bardo.",
        tags: ["Bard", "Healing"],
    },

    {
        slug: "bard-college",
        title: "Bard College (Subclass)",
        body: "En el nivel 3 eliges un Colegio de Bardo (como Conocimiento o Valor). Te otorga rasgos adicionales en los niveles 3, 6 y 14.",
        tags: ["Bard", "Subclass"],
    },

    {
        slug: "expertise-bard",
        title: "Expertise (Bard)",
        body: "Eliges dos habilidades en las que duplicas tu bono de competencia. Obtienes otras dos en el nivel 10.",
        tags: ["Bard", "Skills"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos características en 1 (máx. 20). A veces se permite elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "font-of-inspiration",
        title: "Font of Inspiration",
        body: "Desde nivel 5, recuperas todos tus usos de Inspiración Bárdica después de un descanso corto o largo.",
        tags: ["Bard", "Support"],
    },

    {
        slug: "countercharm",
        title: "Countercharm",
        body: "A partir del nivel 6, como acción, puedes otorgar ventaja en salvaciones contra ser asustado o encantado a ti y aliados en 30 ft hasta el inicio de tu siguiente turno.",
        tags: ["Bard", "Support"],
    },

    {
        slug: "magical-secrets",
        title: "Magical Secrets",
        body: "En nivel 10 aprendes dos conjuros de cualquier clase. Se consideran conjuros de bardo para ti. Obtienes más en los niveles 14 y 18.",
        tags: ["Bard", "Magic"],
    },

    {
        slug: "superior-inspiration",
        title: "Superior Inspiration",
        body: "A partir del nivel 20, si tiras iniciativa y no tienes usos de Inspiración Bárdica, recuperas uno.",
        tags: ["Bard", "Capstone"],
    },
    { slug: "jack-of-all-trades", title: "Jack of All Trades", body: "Add half your proficiency bonus (rounded down) to any ability check you make that doesn’t already include your proficiency bonus.", tags: ["Bard"] },
    { slug: "song-of-rest", title: "Song of Rest", body: "While you or any friendly creatures who can hear you regain HP at the end of a short rest by spending Hit Dice, each regains extra HP (scales by level).", tags: ["Bard"] },
    { slug: "magical-secrets", title: "Magical Secrets", body: "Learn spells from any class; they count as bard spells for you.", tags: ["Bard"] },

    // ===== Cleric =====
    {
        slug: "spellcasting-cleric",
        title: "Spellcasting (Cleric)",
        body: "Como clérigo, lanzas conjuros de la lista de clérigos usando Sabiduría. Preparas un número de conjuros igual a tu modificador de SAB + tu nivel de clérigo. El DC de tus conjuros es 8 + competencia + SAB.",
        tags: ["Cleric", "Magic"],
    },

    {
        slug: "divine-domain",
        title: "Divine Domain (Subclass)",
        body: "En nivel 1 eliges un Dominio Divino (como Vida, Luz, Guerra). Te otorga conjuros adicionales y rasgos en los niveles 1, 2, 6, 8 y 17.",
        tags: ["Cleric", "Subclass"],
    },

    {
        slug: "channel-divinity",
        title: "Channel Divinity",
        body: "En nivel 2 obtienes Channel Divinity, con usos por descanso corto/largo que escalan. Opciones básicas: Turn Undead y rasgos de tu Dominio. Usos: 1 al inicio, 2 al nivel 6, 3 al nivel 18.",
        tags: ["Cleric", "Magic"],
    },

    {
        slug: "turn-undead",
        title: "Turn Undead",
        body: "Acción: los no-muertos en 30 ft hacen un tiro de salvación de Sabiduría. Si fallan, deben huir de ti durante 1 minuto o hasta que sufran daño.",
        tags: ["Cleric", "Channel Divinity"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos características en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "destroy-undead",
        title: "Destroy Undead",
        body: "Al usar Turn Undead, los no-muertos de un CR bajo son destruidos automáticamente en lugar de huir. El CR máximo aumenta con el nivel: 1/2 (5º), 1 (8º), 2 (11º), 3 (14º), 4 (17º).",
        tags: ["Cleric", "Channel Divinity"],
    },

    {
        slug: "divine-intervention",
        title: "Divine Intervention",
        body: "En nivel 10 puedes rogar ayuda divina como acción. Tira d100: si es igual o menor a tu nivel de clérigo, tu deidad interviene. Éxito automático a nivel 20 (una vez por semana).",
        tags: ["Cleric", "Capstone"],
    },
    // ===== Druid =====
    {
        slug: "druidic",
        title: "Druidic",
        body: "Conoces el lenguaje secreto de los druidas. Puedes hablarlo y dejar mensajes ocultos que solo otros que conozcan Druídico pueden descubrir.",
        tags: ["Druid", "Language"],
    },
    {
        slug: "spellcasting-druid",
        title: "Spellcasting (Druid)",
        body: "Lanzas conjuros de la lista de druida usando Sabiduría. Preparas conjuros cada día: SAB mod + nivel de druida. CD de conjuros = 8 + competencia + SAB; ataque de conjuro = competencia + SAB.",
        tags: ["Druid", "Magic"],
    },

    {
        slug: "wild-shape",
        title: "Wild Shape",
        body: "Como acción, asumes la forma de una bestia que hayas visto. Usos: 2 por descanso corto/largo. Duración: inicia en 1 h y escala. Restricciones iniciales (nivel 2): CR máx 1/4, sin velocidad de nado ni de vuelo.",
        tags: ["Druid", "Wild Shape"],
    },
    {
        slug: "druid-circle",
        title: "Druid Circle (Subclass)",
        body: "En nivel 2 eliges un Círculo Druídico (p. ej., Tierra o Luna). Concede rasgos adicionales en 2, 6, 10 y 14.",
        tags: ["Druid", "Subclass"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Aumenta una característica en 2 o dos en 1 (máx. 20). En algunas mesas puedes elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "wild-shape-improvement-4",
        title: "Wild Shape Improvement (4º)",
        body: "Tu Forma Salvaje mejora: CR máx 1/2 y ya puedes elegir bestias con velocidad de nado (aún sin vuelo).",
        tags: ["Druid", "Wild Shape"],
    },
    {
        slug: "wild-shape-improvement-8",
        title: "Wild Shape Improvement (8º)",
        body: "Tu Forma Salvaje mejora: CR máx 1 y ya puedes elegir bestias con velocidad de vuelo.",
        tags: ["Druid", "Wild Shape"],
    },

    {
        slug: "timeless-body",
        title: "Timeless Body",
        body: "Tu envejecimiento se ralentiza de forma drástica; no sufres la fragilidad de la vejez y no puedes envejecer mágicamente.",
        tags: ["Druid"],
    },

    {
        slug: "beast-spells",
        title: "Beast Spells",
        body: "Puedes lanzar la mayoría de tus conjuros de druida mientras estás en Forma Salvaje, usando componentes somáticos y verbales aunque no tengas manos/voz normales (con las restricciones habituales de material costoso).",
        tags: ["Druid", "Wild Shape", "Magic"],
    },

    {
        slug: "archdruid",
        title: "Archdruid",
        body: "Usos ilimitados de Forma Salvaje. Puedes ignorar componentes somáticos y verbales de conjuros de druida, y los materiales que no tengan coste y no se consuman.",
        tags: ["Druid", "Capstone"],
    },
    // ===== Fighter =====
    {
        slug: "fighting-style",
        title: "Fighting Style",
        body: "En 1º nivel eliges un estilo de combate que te da un beneficio pasivo (Arquería, Defensa, Duelo, etc.).",
        tags: ["Fighter", "Combat"],
    },

    {
        slug: "second-wind",
        title: "Second Wind",
        body: "En tu turno, como acción bonus, recuperas HP igual a 1d10 + tu nivel de guerrero. Usable una vez por descanso corto/largo.",
        tags: ["Fighter", "Healing"],
    },

    {
        slug: "action-surge",
        title: "Action Surge",
        body: "Desde nivel 2, en tu turno puedes tomar una acción adicional además de tu acción normal y posible acción bonus. 1 uso por descanso (2 usos a partir de nivel 17).",
        tags: ["Fighter", "Combat"],
    },

    {
        slug: "martial-archetype",
        title: "Martial Archetype (Subclass)",
        body: "En nivel 3 eliges un Arquetipo Marcial (p. ej., Campeón, Maestro de Batalla). Otorga rasgos adicionales en niveles 3, 7, 10, 15 y 18.",
        tags: ["Fighter", "Subclass"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos características en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "extra-attack",
        title: "Extra Attack",
        body: "A partir de nivel 5, cuando tomas la acción de Ataque en tu turno, puedes atacar dos veces en lugar de una. Mejora a 3 ataques en nivel 11 y a 4 ataques en nivel 20.",
        tags: ["Fighter", "Combat"],
    },

    {
        slug: "indomitable",
        title: "Indomitable",
        body: "Desde nivel 9, puedes repetir una tirada de salvación fallida. Debes usar el nuevo resultado. 1 uso por descanso largo (2 usos al nivel 13, 3 al nivel 17).",
        tags: ["Fighter", "Defense"],
    },
    // ===== Monk =====
    {
        slug: "unarmored-defense-monk",
        title: "Unarmored Defense (Monk)",
        body: "AC = 10 + DEX mod + WIS mod mientras no uses armadura ni escudo.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "martial-arts",
        title: "Martial Arts",
        body: "Permite usar DEX para ataques y daño con armas de monje o desarmados, usar un dado de daño especial que escala con nivel y hacer un ataque desarmado adicional como acción bonus después de atacar.",
        tags: ["Monk", "Combat"],
    },

    {
        slug: "ki",
        title: "Ki",
        body: "A partir de nivel 2, obtienes puntos de ki (igual a tu nivel de monje) que se recuperan en descansos cortos/largos. Usos: Flurry of Blows, Patient Defense, Step of the Wind. Ganas más opciones con el nivel.",
        tags: ["Monk", "Resource"],
    },

    {
        slug: "unarmored-movement",
        title: "Unarmored Movement",
        body: "Tu velocidad aumenta mientras no uses armadura ni escudo. El bono escala con nivel, hasta +30 ft en nivel 18. En nivel 9 puedes caminar por superficies verticales y sobre agua mientras te muevas.",
        tags: ["Monk", "Movement"],
    },

    {
        slug: "monastic-tradition",
        title: "Monastic Tradition (Subclass)",
        body: "En nivel 3 eliges una Tradición Monástica (p. ej., Camino de la Mano Abierta, de las Sombras). Te da rasgos en niveles 3, 6, 11 y 17.",
        tags: ["Monk", "Subclass"],
    },

    {
        slug: "deflect-missiles",
        title: "Deflect Missiles",
        body: "En nivel 3 puedes usar tu reacción para reducir el daño de un ataque a distancia en 1d10 + DEX mod + nivel de monje. Si lo reduces a 0, puedes atraparlo y lanzarlo de vuelta gastando 1 punto de ki.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "slow-fall",
        title: "Slow Fall",
        body: "Desde nivel 4, puedes usar tu reacción para reducir el daño por caída en un monto igual a 5 × tu nivel de monje.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "extra-attack-monk",
        title: "Extra Attack (Monk)",
        body: "En nivel 5 puedes atacar dos veces en lugar de una cuando tomas la acción de Ataque en tu turno.",
        tags: ["Monk", "Combat"],
    },

    {
        slug: "stunning-strike",
        title: "Stunning Strike",
        body: "En nivel 5, cuando golpeas con un ataque cuerpo a cuerpo, puedes gastar 1 punto de ki para forzar al objetivo a hacer un tiro de salvación de CON. Si falla, queda Aturdido hasta el final de tu próximo turno.",
        tags: ["Monk", "Combat"],
    },

    {
        slug: "ki-empowered-strikes",
        title: "Ki-Empowered Strikes",
        body: "Desde nivel 6, tus ataques desarmados cuentan como mágicos para superar resistencias e inmunidades.",
        tags: ["Monk", "Combat"],
    },

    {
        slug: "evasion",
        title: "Evasion",
        body: "En nivel 7, cuando haces un tiro de salvación de DEX para mitad de daño, no recibes daño si lo pasas, o la mitad si lo fallas.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "stillness-of-mind",
        title: "Stillness of Mind",
        body: "En nivel 7 puedes usar tu acción para terminar un efecto que te esté encantando o asustando.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "purity-of-body",
        title: "Purity of Body",
        body: "En nivel 10 eres inmune a enfermedades y venenos.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "tongue-of-the-sun-and-moon",
        title: "Tongue of the Sun and Moon",
        body: "En nivel 13 puedes entender y ser entendido por cualquier criatura que conozca un idioma.",
        tags: ["Monk"],
    },

    {
        slug: "diamond-soul",
        title: "Diamond Soul",
        body: "En nivel 14 obtienes competencia en todas las tiradas de salvación. Puedes gastar 1 ki para repetir una salvación fallida.",
        tags: ["Monk", "Defense"],
    },

    {
        slug: "timeless-body-monk",
        title: "Timeless Body (Monk)",
        body: "En nivel 15 tu envejecimiento se ralentiza drásticamente y no puedes ser envejecido mágicamente. Ya no necesitas comer ni beber.",
        tags: ["Monk"],
    },

    {
        slug: "empty-body",
        title: "Empty Body",
        body: "En nivel 18 puedes gastar 4 ki para volverte invisible por 1 minuto, y 8 ki para lanzar Astral Projection sin componentes materiales (sólo tú).",
        tags: ["Monk", "Magic"],
    },

    {
        slug: "perfect-self",
        title: "Perfect Self",
        body: "En nivel 20, si tiras iniciativa y no tienes puntos de ki, recuperas 4.",
        tags: ["Monk", "Capstone"],
    },
    // ===== Paladin =====
    {
        slug: "divine-sense",
        title: "Divine Sense",
        body:
            "Como acción, hasta el final de tu siguiente turno percibes la ubicación de cualquier celestial, infernal o no-muerto dentro de 60 ft que no esté tras cobertura total, y sabes si un lugar u objeto ha sido consagrado o profanado. Usos por descanso largo: 1 + tu mod de CAR.",
        tags: ["Paladin", "Detection"],
    },

    {
        slug: "lay-on-hands",
        title: "Lay on Hands",
        body:
            "Tienes un grupo de puntos de sanación igual a 5 × tu nivel de paladín. Como acción, tocas a una criatura para restaurar HP de ese grupo o para curar una enfermedad o neutralizar un veneno gastando 5 puntos.",
        tags: ["Paladin", "Healing"],
    },

// (Si NO tienes ya 'fighting-style' por Guerrero, puedes añadirlo;
// si ya existe, los paladines simplemente lo referencian.)
    /*
    {
      slug: "fighting-style",
      title: "Fighting Style",
      body: "En 2º nivel eliges un estilo de combate (Arquería, Defensa, Duelo, Protección, etc.) que te otorga un beneficio pasivo.",
      tags: ["Paladin", "Combat"],
    },
    */

    {
        slug: "spellcasting-paladin",
        title: "Spellcasting (Paladin)",
        body:
            "Lanzas conjuros de la lista de paladín usando Carisma. Preparas conjuros de paladín cada día: CAR mod + nivel de paladín. CD de conjuros = 8 + competencia + CAR; ataque de conjuro = competencia + CAR. Recuperas espacios tras descanso largo.",
        tags: ["Paladin", "Magic"],
    },

    {
        slug: "divine-smite",
        title: "Divine Smite",
        body:
            "Cuando golpeas con un ataque cuerpo a cuerpo con un arma, puedes gastar un espacio de conjuro para infligir daño radiante extra. Daño base: 2d8 por espacio de 1er nivel +1d8 por cada nivel de espacio superior (máx 5d8), +1d8 si el objetivo es no-muerto o infernal.",
        tags: ["Paladin", "Combat", "Magic"],
    },

    {
        slug: "divine-health",
        title: "Divine Health",
        body:
            "A partir de 3º nivel eres inmune a las enfermedades.",
        tags: ["Paladin", "Defense"],
    },

    {
        slug: "sacred-oath",
        title: "Sacred Oath (Subclass)",
        body:
            "En 3º nivel juras un Juramento Sagrado (p. ej., Devoción, Venganza). Ganas Conjuros de Juramento y rasgos del juramento en 3, 7, 15 y 20.",
        tags: ["Paladin", "Subclass"],
    },

    {
        slug: "oath-spells",
        title: "Oath Spells",
        body:
            "Tu Juramento te concede conjuros adicionales que siempre están preparados y no cuentan contra tus conjuros preparados.",
        tags: ["Paladin", "Magic", "Subclass"],
    },

    {
        slug: "channel-divinity-paladin",
        title: "Channel Divinity (Paladin)",
        body:
            "Desde 3º nivel obtienes Channel Divinity con opciones de tu Juramento (por ejemplo, Sacred Weapon o Vow of Enmity). Recuperas usos tras descanso corto o largo.",
        tags: ["Paladin", "Magic", "Subclass"],
    },

// ASI ya existe como 'ability-score-improvement' (alias 'ASI').

    /* Extra Attack: usa tu entrada genérica 'extra-attack' existente. */

    {
        slug: "aura-of-protection",
        title: "Aura of Protection",
        body:
            "Desde 6º nivel, tú y las criaturas amigas a 10 ft (30 ft a 18º) añadís tu mod de CAR a todas las tiradas de salvación mientras estés consciente.",
        tags: ["Paladin", "Aura", "Defense"],
    },

    {
        slug: "aura-of-courage",
        title: "Aura of Courage",
        body:
            "Desde 10º nivel, tú y las criaturas amigas a 10 ft (30 ft a 18º) no podéis ser asustados mientras estés consciente.",
        tags: ["Paladin", "Aura", "Defense"],
    },

    {
        slug: "improved-divine-smite",
        title: "Improved Divine Smite",
        body:
            "A partir de 11º nivel, todos tus ataques cuerpo a cuerpo con arma infligen +1d8 de daño radiante adicional (no requiere gastar espacio). Se acumula con Divine Smite si lo usas.",
        tags: ["Paladin", "Combat"],
    },

    {
        slug: "cleansing-touch",
        title: "Cleansing Touch",
        body:
            "Desde 14º nivel, como acción tocas a una criatura (incluido tú) para finalizar un conjuro sobre ella. Usos por descanso largo: igual a tu mod de CAR (mín 1).",
        tags: ["Paladin", "Utility", "Magic"],
    },

    {
        slug: "aura-improvements-18",
        title: "Aura Improvements (18º)",
        body:
            "En 18º nivel, el alcance de tus auras (Protección y Coraje) aumenta de 10 ft a 30 ft.",
        tags: ["Paladin", "Aura"],
    },

// Nivel 20: la característica es de Juramento (capstone del Oath).
    {
        slug: "oath-capstone-20",
        title: "Oath Capstone (20º)",
        body:
            "En 20º nivel obtienes la característica final de tu Juramento (por ejemplo, forma angelical, presencia aterradora, etc.). Consulta tu Juramento específico.",
        tags: ["Paladin", "Subclass", "Capstone"],
    },
    // ===== Ranger =====
    {
        slug: "favored-enemy-2014",
        title: "Favored Enemy",
        body: "En 1º nivel eliges un tipo de enemigo favorecido (bestias, no-muertos, etc.). Tienes ventaja en chequeos de SAB (Supervivencia) para rastrearlos y en chequeos de INT para recordar información. Aprendes un idioma relacionado. Ganas enemigos adicionales en niveles 6 y 14.",
        tags: ["Ranger", "Exploration"],
        aliases: ["Favored Enemy"],
    },

    {
        slug: "natural-explorer-2014",
        title: "Natural Explorer",
        body: "En 1º nivel eliges un tipo de terreno como explorador natural. Eres especialmente hábil viajando allí: velocidad extra, no te pierdes, encuentras comida fácilmente, etc. Obtienes terrenos adicionales en niveles 6 y 10.",
        tags: ["Ranger", "Exploration"],
        aliases: ["Natural Explorer"],
    },

    {
        slug: "spellcasting-ranger",
        title: "Spellcasting (Ranger)",
        body: "En 2º nivel obtienes magia limitada. Preparas conjuros de la lista de explorador usando Sabiduría. CD de conjuros = 8 + competencia + SAB.",
        tags: ["Ranger", "Magic"],
    },

    {
        slug: "fighting-style-ranger",
        title: "Fighting Style (Ranger)",
        body: "En 2º nivel eliges un estilo de combate (Arquería, Defensa, Duelo, Combate con Dos Armas).",
        tags: ["Ranger", "Combat"],
    },

    {
        slug: "ranger-archetype",
        title: "Ranger Archetype (Subclass)",
        body: "En 3º nivel eliges un arquetipo (Cazador, Maestro de Bestias). Obtienes rasgos adicionales en niveles 3, 7, 11 y 15.",
        tags: ["Ranger", "Subclass"],
    },

    {
        slug: "primeval-awareness",
        title: "Primeval Awareness",
        body: "En 3º nivel, gastando un espacio de conjuro puedes detectar si hay aberraciones, celestiales, dragones, elementales, feéricos, infernales o no-muertos en 1 milla (6 millas en terreno favorecido).",
        tags: ["Ranger", "Exploration"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "extra-attack-ranger",
        title: "Extra Attack (Ranger)",
        body: "En 5º nivel puedes atacar dos veces en lugar de una al usar la acción de Ataque.",
        tags: ["Ranger", "Combat"],
    },

    {
        slug: "land-stride",
        title: "Land Stride",
        body: "En 8º nivel te mueves a través de terreno difícil no mágico sin gastar movimiento extra. Además, tienes ventaja en salvaciones contra plantas mágicas que impiden movimiento.",
        tags: ["Ranger", "Exploration"],
    },

    {
        slug: "hide-in-plain-sight",
        title: "Hide in Plain Sight",
        body: "En 10º nivel puedes gastar 1 minuto camuflándote con materiales naturales. Obtienes un bono de +10 a pruebas de Destreza (Sigilo) para permanecer oculto hasta moverte o atacar.",
        tags: ["Ranger", "Stealth"],
    },

    {
        slug: "vanish",
        title: "Vanish",
        body: "En 14º nivel puedes usar la acción bonus para Esconderte. Además, no puedes ser rastreado por medios no mágicos a menos que lo decidas.",
        tags: ["Ranger", "Stealth"],
    },

    {
        slug: "feral-senses",
        title: "Feral Senses",
        body: "En 18º nivel tienes percepción aguda de tu entorno. Puedes atacar criaturas que estén ocultas o invisibles dentro de 30 ft como si fueran visibles.",
        tags: ["Ranger", "Senses"],
    },

    {
        slug: "foe-slayer",
        title: "Foe Slayer",
        body: "En 20º nivel puedes añadir tu mod de SAB a una tirada de ataque o de daño contra tu enemigo favorecido. Puedes usarlo en cada uno de tus turnos.",
        tags: ["Ranger", "Capstone"],
    },
    // ===== Rogue =====
    {
        slug: "sneak-attack",
        title: "Sneak Attack",
        body: "Una vez por turno, cuando atacas con un arma sutil o a distancia y tienes ventaja en la tirada de ataque, infliges daño extra. También aplica si un aliado está a 5 ft del objetivo y no tienes desventaja. El daño extra escala con nivel (1d6 en nivel 1 hasta 10d6 en nivel 19).",
        tags: ["Rogue", "Combat"],
    },

    {
        slug: "thieves-cant",
        title: "Thieves' Cant",
        body: "Conoces el argot secreto de los pícaros: un lenguaje de palabras, gestos y símbolos ocultos que lleva cuatro veces más tiempo comunicar que el habla normal.",
        tags: ["Rogue", "Language"],
    },

    {
        slug: "cunning-action",
        title: "Cunning Action",
        body: "Desde nivel 2, puedes usar tu acción bonus en cada turno para Correr (Dash), Retirarte (Disengage) o Esconderte (Hide).",
        tags: ["Rogue", "Utility"],
    },

    {
        slug: "rogue-archetype",
        title: "Rogue Archetype (Subclass)",
        body: "En nivel 3 eliges un arquetipo (Ladrón, Asesino, Arcan Trickster, etc.). Ganas rasgos adicionales en niveles 3, 9, 13 y 17.",
        tags: ["Rogue", "Subclass"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "uncanny-dodge",
        title: "Uncanny Dodge",
        body: "Desde nivel 5, cuando un atacante que puedes ver te impacta, puedes usar tu reacción para reducir a la mitad el daño.",
        tags: ["Rogue", "Defense"],
    },

    {
        slug: "evasion-rogue",
        title: "Evasion (Rogue)",
        body: "Desde nivel 7, cuando haces una tirada de salvación de DEX para recibir mitad de daño, no recibes nada si tienes éxito y solo la mitad si fallas.",
        tags: ["Rogue", "Defense"],
    },

    {
        slug: "reliable-talent",
        title: "Reliable Talent",
        body: "En nivel 11, cuando haces un chequeo de habilidad con competencia, consideras cualquier tirada de d20 de 9 o menos como un 10.",
        tags: ["Rogue", "Skills"],
    },

    {
        slug: "blindsense",
        title: "Blindsense",
        body: "Desde nivel 14, si no estás incapacitado, sabes la ubicación de cualquier criatura oculta o invisible dentro de 10 ft de ti.",
        tags: ["Rogue", "Senses"],
    },

    {
        slug: "slippery-mind",
        title: "Slippery Mind",
        body: "En nivel 15 obtienes competencia en salvaciones de Sabiduría.",
        tags: ["Rogue", "Defense"],
    },

    {
        slug: "elusive",
        title: "Elusive",
        body: "En nivel 18, mientras no estés incapacitado, ningún ataque tiene ventaja contra ti.",
        tags: ["Rogue", "Defense"],
    },

    {
        slug: "stroke-of-luck",
        title: "Stroke of Luck",
        body: "En nivel 20, una vez por descanso corto/largo puedes convertir un fallo de ataque en un impacto, o un fallo en un chequeo de habilidad en un 20 natural.",
        tags: ["Rogue", "Capstone"],
    },
    // ===== Sorcerer =====
    {
        slug: "spellcasting-sorcerer",
        title: "Spellcasting (Sorcerer)",
        body:
            "Lanzas conjuros de la lista de Hechicero usando Carisma. Conoces un número limitado de conjuros y trucos; los espacios de conjuro escalan con el nivel. CD de conjuros = 8 + competencia + CAR; ataque de conjuro = competencia + CAR.",
        tags: ["Sorcerer", "Magic"],
    },

    {
        slug: "sorcerous-origin",
        title: "Sorcerous Origin (Subclass)",
        body:
            "En 1º nivel eliges un Origen Hechicero (p. ej., Linaje Dracónico, Magia Salvaje). Te otorga rasgos adicionales en niveles 1, 6, 14 y 18.",
        tags: ["Sorcerer", "Subclass"],
    },

    {
        slug: "font-of-magic",
        title: "Font of Magic",
        body:
            "Desde 2º nivel obtienes Puntos de Hechicería (PH), que se recuperan tras un descanso largo y escalan con tu nivel. Con 'Flexible Casting' puedes convertir espacios de conjuro en PH y viceversa siguiendo las tablas de conversión.",
        tags: ["Sorcerer", "Magic", "Resource"],
    },

    {
        slug: "metamagic",
        title: "Metamagic",
        body:
            "Desde 3º nivel eliges opciones de Metamagia (p. ej., Conjuro Acelerado, Sutil, Gemelo, Potenciado). Gastas Puntos de Hechicería para alterar tus conjuros. Obtienes opciones adicionales en 10º y 17º nivel.",
        tags: ["Sorcerer", "Magic"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body:
            "Incrementa una característica en 2 o dos características en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "sorcerous-restoration",
        title: "Sorcerous Restoration",
        body:
            "En 20º nivel, cuando terminas un descanso corto recuperas 4 Puntos de Hechicería.",
        tags: ["Sorcerer", "Capstone", "Resource"],
    },
    // ===== Warlock =====
    {
        slug: "otherworldly-patron",
        title: "Otherworldly Patron (Subclass)",
        body: "En 1º nivel eliges a tu patrón sobrenatural (p. ej., Archifey, Fiend, Great Old One). Te otorga rasgos adicionales en niveles 1, 6, 10 y 14.",
        tags: ["Warlock", "Subclass"],
    },

    {
        slug: "pact-magic",
        title: "Pact Magic",
        body: "Usas una forma especial de magia. Tus espacios de conjuro se recuperan en descansos cortos y largos. Todos tus espacios son del mismo nivel, que escala a medida que subes de nivel.",
        tags: ["Warlock", "Magic"],
    },

    {
        slug: "eldritch-invocations",
        title: "Eldritch Invocations",
        body: "Desde 2º nivel, eliges invocaciones que te otorgan habilidades mágicas permanentes o mejoras (como Agonizing Blast o Mask of Many Faces). Aprendes más invocaciones a medida que subes de nivel.",
        tags: ["Warlock", "Magic"],
    },

    {
        slug: "pact-boon",
        title: "Pact Boon",
        body: "En 3º nivel eliges un pacto especial: Pacto de la Cadena (familiar mejorado), Pacto de la Espada (arma vinculada) o Pacto del Tomo (Libro de las Sombras con trucos adicionales).",
        tags: ["Warlock", "Subclass"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos características en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "mystic-arcanum",
        title: "Mystic Arcanum",
        body: "A partir de nivel 11, obtienes acceso a un conjuro de 6º nivel que puedes lanzar 1 vez por descanso largo sin gastar espacio de conjuro. Aumenta con el nivel: 7º nivel (13º), 8º nivel (15º), 9º nivel (17º).",
        tags: ["Warlock", "Magic"],
    },

    {
        slug: "eldritch-master",
        title: "Eldritch Master",
        body: "En nivel 20, puedes suplicar a tu patrón un minuto de súplica para recuperar todos tus espacios de Pacto una vez por descanso largo.",
        tags: ["Warlock", "Capstone"],
    },
    // ===== Wizard =====
    // ===== Wizard =====
    {
        slug: "spellcasting-wizard",
        title: "Spellcasting (Wizard)",
        body: "Lanzas conjuros de la lista de mago usando Inteligencia. Preparas conjuros cada día: INT mod + nivel de mago. CD de conjuros = 8 + competencia + INT; ataque de conjuro = competencia + INT. Aprendes nuevos conjuros al subir de nivel y puedes copiar pergaminos/libros.",
        tags: ["Wizard", "Magic"],
    },

    {
        slug: "arcane-recovery",
        title: "Arcane Recovery",
        body: "En nivel 1, una vez por día tras un descanso corto, recuperas espacios de conjuro con un nivel combinado igual a la mitad de tu nivel de mago (redondeado hacia arriba).",
        tags: ["Wizard", "Magic"],
    },

    {
        slug: "arcane-tradition",
        title: "Arcane Tradition (Subclass)",
        body: "En nivel 2 eliges una Escuela de Magia (p. ej., Evocación, Ilusión, Necromancia). Obtienes rasgos adicionales en niveles 2, 6, 10 y 14.",
        tags: ["Wizard", "Subclass"],
    },

    {
        slug: "ability-score-improvement",
        title: "Ability Score Improvement",
        body: "Incrementa una característica en 2 o dos en 1 (máx. 20). Algunas mesas permiten elegir un dote en su lugar.",
        tags: ["All"],
        aliases: ["ASI"],
    },

    {
        slug: "spell-mastery",
        title: "Spell Mastery",
        body: "En nivel 18 eliges un conjuro de 1er nivel y otro de 2º que puedes lanzar a nivel base sin gastar espacios de conjuro. Puedes cambiarlos tras descanso largo con estudio.",
        tags: ["Wizard", "Magic"],
    },

    {
        slug: "signature-spells",
        title: "Signature Spells",
        body: "En nivel 20 eliges dos conjuros de 3er nivel que siempre tienes preparados y puedes lanzar una vez cada uno sin gastar espacio de conjuro (recuperas tras descanso corto/largo).",
        tags: ["Wizard", "Capstone", "Magic"],
    },
];