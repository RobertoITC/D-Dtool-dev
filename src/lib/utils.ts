export const uid = () => Math.random().toString(36).slice(2, 9);

export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export function defaultNameFromUrl(url: string) {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be")) return "YouTube";
        const p = u.pathname.split("/").pop() || url;
        return decodeURIComponent(p).slice(0, 32);
    } catch {
        return "Audio";
    }
}

export function parseYouTubeId(url: string): string | null {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
        if (u.hostname.includes("youtube.com")) {
            const v = u.searchParams.get("v");
            if (v) return v;
            const m = u.pathname.match(/\/(shorts|live)\/([^/]+)/);
            if (m) return m[2];
        }
    } catch {}
    return null;
}