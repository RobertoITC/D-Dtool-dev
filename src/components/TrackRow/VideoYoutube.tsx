import React, { useEffect, useRef } from "react";
export function VideoYouTube({
                                 videoId, onReady, onStateChange, visible
                             }:{
    videoId: string;
    onReady: (player:any)=>void;
    onStateChange: (player:any, state:number)=>void;
    visible: boolean;
}) {
    const ref = useRef<HTMLDivElement|null>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!ref.current || playerRef.current || !("YT" in window)) return;
        playerRef.current = new (window as any).YT.Player(ref.current, {
            width: "100%", height: "240", videoId,
            playerVars: { controls: 0, disablekb: 1, modestbranding: 1 },
            events: {
                onReady: (e:any) => onReady(e.target),
                onStateChange: (e:any) => onStateChange(e.target, e.data),
            }
        });
    }, [videoId, onReady, onStateChange]);

    return <div className={`${visible ? "block":"hidden"} overflow-hidden rounded-lg border border-white/10 bg-black/60`}>
        <div ref={ref} className="aspect-video w-full" />
    </div>;
}