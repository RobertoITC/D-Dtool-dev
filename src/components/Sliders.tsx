
export function MasterAndCrossfader({
                                        masterVol, setMasterVol, crossfade, setCrossfade,
                                    }:{
    masterVol: number; setMasterVol: (n:number)=>void;
    crossfade: number; setCrossfade: (n:number)=>void;
}) {
    return (
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-56">
                        <label className="block text-xs uppercase tracking-widest text-slate-400">Master Volume</label>
                        <input type="range" min={0} max={1} step={0.01} value={masterVol} onChange={e=>setMasterVol(Number(e.target.value))} className="w-full"/>
                        <div className="text-sm tabular-nums">{Math.round(masterVol*100)}%</div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs uppercase tracking-widest text-slate-400">Crossfader (A ⇄ B)</label>
                        <input type="range" min={0} max={1} step={0.01} value={crossfade} onChange={e=>setCrossfade(Number(e.target.value))} className="w-full"/>
                        <div className="flex justify-between text-xs text-slate-400"><span>A</span><span>B</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}