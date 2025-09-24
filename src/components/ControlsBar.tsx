
export function ControlsBar(props: {
    onPlayPauseAll: () => void;
    isAnyPlaying: boolean;
    onMuteAll: (v:boolean)=>void;
    onStop: () => void;
    onExport: () => void;
    onImport: () => void;
    onClear: () => void;
}) {
    const { onPlayPauseAll, isAnyPlaying, onMuteAll, onStop, onExport, onImport, onClear } = props;
    return (
        <div className="flex flex-wrap gap-2">
            <button onClick={onPlayPauseAll} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500">
                {isAnyPlaying ? "Pause All" : "Play All"}
            </button>
            <button onClick={()=>onMuteAll(true)}  className="rounded-xl bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600">Mute All</button>
            <button onClick={()=>onMuteAll(false)} className="rounded-xl bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600">Unmute All</button>
            <button onClick={onStop}    className="rounded-xl bg-amber-700 px-4 py-2 text-sm hover:bg-amber-600">Stop</button>
            <button onClick={onExport}  className="rounded-xl bg-indigo-700 px-4 py-2 text-sm hover:bg-indigo-600">Export</button>
            <button onClick={onImport}  className="rounded-xl bg-indigo-800 px-4 py-2 text-sm hover:bg-indigo-700">Import</button>
            <button onClick={onClear}   className="rounded-xl bg-rose-800 px-4 py-2 text-sm hover:bg-rose-700">Clear</button>
        </div>
    );
}