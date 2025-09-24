export type Resolved = { title: string; body: string; compendium: string };

export function resolveRule(title: string, classId?: string): Resolved {
    // Default: no local write-up, compendium link goes to class page if provided
    const compendium = classId
        ? `https://roll20.net/compendium/dnd5e/${encodeURIComponent(classId)}#content`
        : `https://roll20.net/compendium/dnd5e/${encodeURIComponent(title)}#content`;

    return {
        title,
        body: "No local write-up yet. Use the compendium link below.",
        compendium,
    };
}