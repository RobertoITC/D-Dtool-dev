
export default function LinkCard({
                             href,
                             label,
                             subtitle,
                         }: {
    href: string;
    label: string;
    subtitle?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-800/30 p-3 transition hover:shadow-lg hover:shadow-emerald-600/10"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/90 ring-1 ring-white/10">
                    {/* external-link icon */}
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white">
                        <path
                            fill="currentColor"
                            d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
                        />
                    </svg>
                </div>
                <div className="min-w-0">
                    <div className="font-semibold leading-tight text-slate-100 group-hover:text-white">
                        {label}
                    </div>
                    {subtitle && (
                        <div className="text-xs text-slate-400 group-hover:text-slate-300">
                            {subtitle}
                        </div>
                    )}
                </div>
                <div className="ml-auto opacity-60 transition group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-300">
                        <path fill="currentColor" d="M9.29 6.71L13.58 11l-4.29 4.29L10 17l6-6-6-6-0.71 1.71Z" />
                    </svg>
                </div>
            </div>
        </a>
    );
}