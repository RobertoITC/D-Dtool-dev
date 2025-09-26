// ID único corto
export function uid() {
    return Math.random().toString(36).slice(2, 9);
}

// Nombre por defecto a partir de la URL
export function defaultNameFromUrl(url: string): string {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
            return "YouTube Video";
        }
        return u.pathname.split("/").pop() || url;
    } catch {
        return url;
    }
}

// Extraer ID de YouTube
export function parseYouTubeId(url: string): string | null {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) {
            return u.pathname.slice(1);
        }
        if (u.hostname.includes("youtube.com")) {
            const v = u.searchParams.get("v");
            if (v) return v;
            const m = u.pathname.match(/\/(shorts|live)\/([^/]+)/);
            if (m) return m[2];
        }
        return null;
    } catch {
        return null;
    }
}

// Thumbnail oficial de YouTube
export function youtubeThumb(id: string, quality: "hq" | "mq" = "hq") {
    const q = quality === "hq" ? "hqdefault" : "mqdefault";
    return `https://i.ytimg.com/vi/${id}/${q}.jpg`;
}

// Clamp 0..1
export function clamp01(x: number) {
    return Math.max(0, Math.min(1, x));
}