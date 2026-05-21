import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";

function LatestResults({ results }) {
    const navigate = useNavigate();

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Results
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-white">Latest Results</h2>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/matches?tab=results")}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                    View all
                </button>
            </div>

            {results.length === 0 ? (
                <EmptyState
                    title="No results available"
                    message="Finished matches will show here once the league has recent results."
                />
            ) : (
                <div className="space-y-3">
                    {results.map((match) => (
                        <article
                            key={match.matchId}
                            className="rounded-2xl border border-white/[0.06] bg-zinc-950/40 p-4"
                        >
                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <img
                                        src={match.homeLogo}
                                        alt=""
                                        className="h-9 w-9 object-contain"
                                    />
                                    <p className="truncate text-sm font-semibold text-white">
                                        {match.homeTeam}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white/5 px-3 py-2 text-center">
                                    <p className="text-lg font-black text-white">
                                        {match.homeScore} - {match.awayScore}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                                        FT
                                    </p>
                                </div>

                                <div className="flex min-w-0 items-center justify-end gap-3 text-right">
                                    <p className="truncate text-sm font-semibold text-white">
                                        {match.awayTeam}
                                    </p>
                                    <img
                                        src={match.awayLogo}
                                        alt=""
                                        className="h-9 w-9 object-contain"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default LatestResults;
