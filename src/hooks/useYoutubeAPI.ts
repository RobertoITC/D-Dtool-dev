import { useEffect, useState } from "react";

declare global {
    interface Window { YT: any; onYouTubeIframeAPIReady: () => void; }
}

export function useYouTubeAPI() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (window.YT?.Player) { setReady(true); return; }
        if (document.getElementById("youtube-iframe-api")) return;
        const s = document.createElement("script");
        s.id = "youtube-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        s.async = true;
        document.body.appendChild(s);
        window.onYouTubeIframeAPIReady = () => setReady(true);
    }, []);
    return ready;
}