// src/dj/useYouTube.ts
import { useEffect, useMemo, useRef, useState } from "react";
import { clamp01 } from "../lib/utils";

declare global {
    interface Window { YT: any; onYouTubeIframeAPIReady: () => void; }
}

export function useYouTubeAPI() {
    const [ready, setReady] = useState<boolean>(() => !!(window as any).YT?.Player);
    useEffect(() => {
        if (ready) return;
        if (document.getElementById("youtube-iframe-api")) return;
        const s = document.createElement("script");
        s.id = "youtube-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(s);
        window.onYouTubeIframeAPIReady = () => setReady(true);
    }, [ready]);
    return ready;
}

export function useYouTubePlayer(mountId: string, videoId: string | null, onReady?: (p: any) => void) {
    const apiReady = useYouTubeAPI();
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!apiReady || !videoId) return;

        if (playerRef.current) {
            try { playerRef.current.destroy(); } catch {}
            playerRef.current = null;
        }

        const player = new (window as any).YT.Player(mountId, {
            host: "https://www.youtube-nocookie.com", // ok
            width: 0,
            height: 0,
            videoId,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
                origin: window.location.origin,
            },
            events: {
                onReady: () => { onReady?.(player); },
                onError: () => { /* silenciamos errores de adblock */ },
            },
        });

        playerRef.current = player;
        return () => { try { player.destroy(); } catch {} playerRef.current = null; };
    }, [apiReady, videoId, mountId, onReady]);

    return useMemo(() => ({
        play() { playerRef.current?.playVideo?.(); },
        pause() { playerRef.current?.pauseVideo?.(); },
        setVolume(v01: number) { playerRef.current?.setVolume?.(Math.round(clamp01(v01) * 100)); },
        unmute() { try { playerRef.current?.unMute?.(); } catch {} },
        isReady: !!playerRef.current,
    }), []);
}