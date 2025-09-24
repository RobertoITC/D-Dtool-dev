import { useEffect, useRef } from "react";
import type { Track } from "../../types";
import { niceTime } from "../../lib/time";
// @ts-ignore
import { VideoYouTube } from "./VideoYouTube";
import { VideoHTML } from "./VideoHTML";

type Props = {
    track: Track;
    ytReady: boolean;
    updateTrack: (id: string, patch: Partial<Track>) => void;
    removeTrack: (id: string) => void;
    /** Computes the current effective volume (master * crossfader * track volume/solo/mute) */
    effectiveVol: (t: Track) => number;
};

export function TrackRow({
                             track,
                             ytReady,
                             updateTrack,
                             removeTrack,
                             effectiveVol,
                         }: Props) {
    const htmlVideoRef = useRef<HTMLVideoElement | null>(null);
    const ytPlayerRef = useRef<any>(null);
    const tickRef = useRef<number | null>(null);

    // ---- EFFECT: sync play/pause to underlying players ----
    useEffect(() => {
        if (track.type === "youtube") {
            const p = ytPlayerRef.current;
            if (!p) return;
            if (track.playing) p.playVideo();
            else p.pauseVideo();
        } else {
            const v = htmlVideoRef.current;
            if (!v) return;
            if (track.playing) v.play().catch(() => {});
            else v.pause();
        }
    }, [track.playing, track.type]);

    // ---- EFFECT: sync volume (inc. solo/mute/crossfade/master changes) ----
    useEffect(() => {
        const vol = Math.max(0, Math.min(1, effectiveVol(track)));
        if (track.type === "youtube") {
            const p = ytPlayerRef.current;
            if (!p?.setVolume) return;
            p.setVolume(Math.round(vol * 100));
            if (vol > 0 && p.unMute) p.unMute();
            if (vol === 0 && p.mute) p.mute();
        } else {
            const v = htmlVideoRef.current;
            if (!v) return;
            v.volume = vol;
            v.muted = vol === 0;
        }
    }, [track, track.muted, track.solo, track.volume, track.side]); // effectiveVol also depends on master/crossfade (from parent)

    // ---- progress polling (every 500ms while playing) ----
    function startTick() {
        stopTick();
        tickRef.current = window.setInterval(() => {
            if (track.type === "youtube") {
                const p = ytPlayerRef.current;
                if (!p?.getCurrentTime) return;
                const ct = p.getCurrentTime();
                const dur = p.getDuration?.() || track.duration || 0;
                updateTrack(track.id, { currentTime: ct, duration: dur });
            } else {
                const v = htmlVideoRef.current;
                if (!v) return;
                updateTrack(track.id, {
                    currentTime: v.currentTime,
                    duration: v.duration || track.duration || 0,
                });
            }
        }, 500) as unknown as number;
    }
    function stopTick() {
        if (tickRef.current != null) {
            clearInterval(tickRef.current);
            tickRef.current = null;
        }
    }
    useEffect(() => {
        return () => stopTick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ---- YouTube wiring ----
    const onYTReady = (player: any) => {
        ytPlayerRef.current = player;
        // set initial volume
        player.setVolume(Math.round(effectiveVol(track) * 100));
        // fetch title if available
        const data = player.getVideoData?.();
        if (data?.title) updateTrack(track.id, { title: `YouTube • ${data.title}` });
        if (track.playing) player.playVideo();
    };

    const onYTState = (player: any, state: number) => {
        // 0 = ended, 1 = playing, 2 = paused
        if (state === 0) {
            if (track.loop) {
                player.seekTo(0, true);
                player.playVideo();
            } else {
                updateTrack(track.id, { playing: false, currentTime: 0 });
            }
            stopTick();
        } else if (state === 1) {
            startTick();
        } else if (state === 2) {
            stopTick();
        }
    };

    // ---- HTML5 video callbacks ----
    const onHTMLLoaded = (v: HTMLVideoElement) => {
        updateTrack(track.id, { duration: v.duration || 0 });
    };
    const onHTMLEnded = (v: HTMLVideoElement) => {
        if (track.loop) {
            v.currentTime = 0;
            v.play();
        } else {
            updateTrack(track.id, { playing: false, currentTime: 0 });
        }
    };

    // ---- Seek handler ----
    const seekTo = (seconds: number) => {
        if (track.type === "youtube") {
            const p = ytPlayerRef.current;
            if (!p) return;
            p.seekTo(seconds, true);
        } else {
            const v = htmlVideoRef.current;
            if (!v) return;
            v.currentTime = seconds;
        }
        updateTrack(track.id, { currentTime: seconds });
    };

    return (
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-start justify-between gap-3">
                {/* Left: controls */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-semibold">{track.title}</span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-400">
              {track.type}
            </span>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTrack(track.id, { playing: !track.playing })}
                                className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold hover:bg-emerald-500"
                            >
                                {track.playing ? "Pause" : "Play"}
                            </button>
                            <button
                                onClick={() => updateTrack(track.id, { muted: !track.muted })}
                                className="rounded-lg bg-slate-700 px-3 py-1 text-xs hover:bg-slate-600"
                            >
                                {track.muted ? "Unmute" : "Mute"}
                            </button>
                            <label className="flex items-center gap-1 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={track.loop}
                                    onChange={(e) => updateTrack(track.id, { loop: e.target.checked })}
                                />
                                Loop
                            </label>
                            <label className="flex items-center gap-1 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={track.solo}
                                    onChange={(e) => updateTrack(track.id, { solo: e.target.checked })}
                                />
                                Solo
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-xs text-slate-400">Vol</label>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={track.volume}
                                onChange={(e) =>
                                    updateTrack(track.id, { volume: Number(e.target.value) })
                                }
                                className="w-40"
                            />
                            <select
                                value={track.side}
                                onChange={(e) =>
                                    updateTrack(track.id, { side: e.target.value as Track["side"] })
                                }
                                className="rounded-md bg-black/40 px-2 py-1 text-xs"
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="Both">Both</option>
                            </select>
                            <button
                                onClick={() => removeTrack(track.id)}
                                className="ml-auto rounded-lg bg-rose-800 px-3 py-1 text-xs hover:bg-rose-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                    {/* Seek */}
                    <div className="mt-2">
                        <input
                            type="range"
                            min={0}
                            max={track.duration || 1}
                            step={0.1}
                            value={track.currentTime}
                            onChange={(e) => seekTo(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>{niceTime(track.currentTime)}</span>
                            <span>{niceTime(track.duration)}</span>
                        </div>
                    </div>
                </div>

                {/* Right: preview */}
                <div className="w-56">
                    {track.type === "youtube" ? (
                        <VideoYouTube
                            videoId={track.videoId!}
                            onReady={onYTReady}
                            onStateChange={onYTState}
                            visible={track.showVideo}
                        />
                    ) : (
                        <VideoHTML
                            src={track.url}
                            loop={track.loop}
                            onLoaded={(v) => {
                                htmlVideoRef.current = v;
                                onHTMLLoaded(v);
                            }}
                            onEnded={(v) => onHTMLEnded(v)}
                            visible={track.showVideo}
                        />
                    )}
                    <label className="mt-1 flex items-center gap-2 text-xs text-slate-300">
                        <input
                            type="checkbox"
                            checked={track.showVideo}
                            onChange={(e) => updateTrack(track.id, { showVideo: e.target.checked })}
                        />
                        Show video
                    </label>
                </div>
            </div>
        </div>
    );
}