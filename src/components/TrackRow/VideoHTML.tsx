import React, { useEffect, useRef } from "react";
export function VideoHTML({
                              src, loop, onLoaded, onEnded, visible
                          }:{
    src: string; loop: boolean;
    onLoaded: (v: HTMLVideoElement)=>void;
    onEnded: (v: HTMLVideoElement)=>void;
    visible: boolean;
}) {
    const vref = useRef<HTMLVideoElement|null>(null);
    useEffect(() => {
        const v = vref.current; if (!v) return;
        const lm = () => onLoaded(v);
        const ed = () => onEnded(v);
        v.addEventListener("loadedmetadata", lm);
        v.addEventListener("ended", ed);
        return () => { v.removeEventListener("loadedmetadata", lm); v.removeEventListener("ended", ed); };
    }, [onLoaded, onEnded]);
    return (
        <div className={`${visible ? "block":"hidden"} overflow-hidden rounded-lg border border-white/10 bg-black/60`}>
            <video ref={vref} src={src} className="aspect-video w-full" playsInline crossOrigin="anonymous" loop={loop}/>
        </div>
    );
}