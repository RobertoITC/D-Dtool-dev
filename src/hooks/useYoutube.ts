import { useEffect, useRef } from "react";

// Hook minimal para manejar el IFrame Player de YouTube montado en un div por id
export function useYouTubePlayer(mountId: string, videoId: string | null) {
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!videoId) return;

        // Cargar API si hace falta
        if (!(window as any).YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }

        function create() {
            if (!(window as any).YT || !(window as any).YT.Player) {
                setTimeout(create, 200);
                return;
            }
            const mount = document.getElementById(mountId);
            if (!mount) {
                setTimeout(create, 100);
                return;
            }

            // Destruir viejo si existe
            try { playerRef.current?.destroy?.(); } catch {}
            playerRef.current = new (window as any).YT.Player(mountId, {
                host: "https://www.youtube-nocookie.com",
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
            });
        }

        create();
        return () => {
            try { playerRef.current?.destroy?.(); } catch {}
            playerRef.current = null;
        };
    }, [videoId, mountId]);

    return {
        play: () => playerRef.current?.playVideo?.(),
        pause: () => playerRef.current?.pauseVideo?.(),
        mute: () => playerRef.current?.mute?.(),
        unmute: () => playerRef.current?.unMute?.(),
        setVolume: (v01: number) => {
            const v = Math.round(Math.max(0, Math.min(1, v01)) * 100);
            playerRef.current?.setVolume?.(v);
        },
    };
}