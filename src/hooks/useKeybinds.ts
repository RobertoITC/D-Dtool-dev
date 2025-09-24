import { useEffect } from "react";
export function useKeybinds(actions: {
    togglePlayAll: () => void;
    muteAll: (v: boolean) => void;
    stopAll: () => void;
    nudgeCrossfade: (delta: number) => void;
    nudgeMaster: (delta: number) => void;
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement)?.tagName === "INPUT") return;
            if (e.code === "Space") { e.preventDefault(); actions.togglePlayAll(); }
            if (e.code === "KeyM") actions.muteAll(true);
            if (e.code === "KeyU") actions.muteAll(false);
            if (e.code === "KeyS") actions.stopAll();
            if (e.code === "ArrowLeft") actions.nudgeCrossfade(-0.05);
            if (e.code === "ArrowRight") actions.nudgeCrossfade(+0.05);
            if (e.code === "Minus") actions.nudgeMaster(-0.05);
            if (e.code === "Equal") actions.nudgeMaster(+0.05);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [actions]);
}