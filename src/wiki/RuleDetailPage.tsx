
import { Link, useLocation, useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import { findEntry } from "./index";

function useQueryTitle() {
    const loc = useLocation();
    const p = new URLSearchParams(loc.search);
    return p.get("title") || "";
}
function useQueryClass() {
    const loc = useLocation();
    const p = new URLSearchParams(loc.search);
    return p.get("class") || "";
}

export default function RuleDetailPage() {
    const { slug = "" } = useParams<{ slug: string }>();
    const titleFromQuery = useQueryTitle();
    const classId = useQueryClass();

    const entry = findEntry(slug) || findEntry(titleFromQuery);

    const title = entry?.title || titleFromQuery || "Rule Detail";
    const body =
        entry?.body ||
        "No local write-up yet. Ask your DM, or open the compendium link below.";
    const compLink = `https://roll20.net/compendium/dnd5e/${encodeURIComponent(
        entry?.title || classId || title
    )}#content`;

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="mb-4 flex items-center gap-2">
                <Link to={-1 as any} className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">
                    ← Back
                </Link>
                <Link to="/levels" className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700">
                    Level-Up Cards
                </Link>
            </div>

            <h1 className="text-3xl font-black tracking-tight">{title}</h1>
            <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-200">{body}</p>

            <div className="mt-6">
                <LinkCard
                    href={compLink}
                    label={`Open “${title}” in Compendium`}
                    subtitle="Full rules reference on Roll20"
                />
            </div>
        </div>
    );
}