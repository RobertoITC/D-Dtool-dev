export const YT_REGEX = {
    full: /(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    short: /(youtu\.be\/)([a-zA-Z0-9_-]{11})/,
};
export function parseYouTubeId(url: string): string | null {
    if (YT_REGEX.full.test(url)) return url.match(YT_REGEX.full)?.[2] ?? null;
    if (YT_REGEX.short.test(url)) return url.match(YT_REGEX.short)?.[2] ?? null;
    return null;
}