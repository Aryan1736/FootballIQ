import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";

function TopScorers({ scorers }) {
    const navigate = useNavigate();

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Attack
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-white">Top Scorers</h2>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                    Goals
                </span>
            </div>

            {scorers.length === 0 ? (
                <EmptyState
                    title="No scorers yet"
                    message="Scorer data will appear when the league endpoint returns results."
                />
            ) : (
                <div className="space-y-3">
                    {scorers.slice(0, 8).map((scorer, index) => (
                        <button
                            key={scorer.playerId}
                            type="button"
                            onClick={() => navigate(`/player/${scorer.playerId}`)}
                            className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-zinc-950/40 px-4 py-3 text-left transition hover:border-emerald-300/40 hover:bg-white/[0.06]"
                        >
                            <span className="flex min-w-0 items-center gap-3">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-sm font-bold text-zinc-400">
                                    {index + 1}
                                </span>
                                <img
                                    src={scorer.teamLogo}
                                    alt=""
                                    className="h-10 w-10 shrink-0 object-contain"
                                />
                                <span className="min-w-0">
                                    <span className="block truncate font-semibold text-white">
                                        {scorer.playerName}
                                    </span>
                                    <span className="block truncate text-sm text-zinc-500">
                                        {scorer.teamName}
                                    </span>
                                </span>
                            </span>
                            <span className="text-2xl font-black text-emerald-300">
                                {scorer.goals}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}

export default TopScorers;
