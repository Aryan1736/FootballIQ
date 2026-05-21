import { useEffect, useState } from "react";
import { getFinishedMatches, getMatches } from "../services/footballService";
import AppShell from "../components/AppShell";
import EmptyState from "../components/EmptyState";
import MatchCard from "../components/MatchCard";
import { getLeague } from "../lib/leagues";

function MatchesPage() {
    const [league, setLeague] = useState(localStorage.getItem("league") || "PL");
    const [showResults, setShowResults] = useState(
        new URLSearchParams(window.location.search).get("tab") === "results"
    );
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const selectedLeague = getLeague(league);

    useEffect(() => {
        let cancelled = false;
        localStorage.setItem("league", league);

        const fetchMatches = showResults ? getFinishedMatches : getMatches;

        Promise.resolve()
            .then(() => {
                setLoading(true);
                setError("");
                return fetchMatches(league);
            })
            .then((response) => {
                if (!cancelled) {
                    setMatches(response.data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Could not load match data from the backend.");
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [league, showResults]);

    const groupedMatches = matches.reduce((groups, match) => {
        const date = new Date(match.matchDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });

        return {
            ...groups,
            [date]: [...(groups[date] || []), match]
        };
    }, {});

    return (
        <AppShell
            league={league}
            setLeague={setLeague}
            eyebrow={showResults ? "Results" : "Fixtures"}
            title={`${selectedLeague.name} ${showResults ? "results" : "fixtures"}`}
            description="Browse matchdays in grouped sections with clearer scores, club crests, and league context."
            meta={[
                { label: "Mode", value: showResults ? "FT" : "Live" },
                { label: "Matches", value: matches.length || "--" }
            ]}
        >
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
                <button
                    type="button"
                    onClick={() => setShowResults(false)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                        !showResults
                            ? "bg-emerald-300 text-zinc-950"
                            : "text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    Upcoming
                </button>
                <button
                    type="button"
                    onClick={() => setShowResults(true)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                        showResults
                            ? "bg-emerald-300 text-zinc-950"
                            : "text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    Results
                </button>
            </div>

            {loading && (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-32 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                        />
                    ))}
                </div>
            )}

            {!loading && error && <EmptyState title="Matches unavailable" message={error} />}

            {!loading && !error && matches.length === 0 && (
                <EmptyState
                    title="No matches found"
                    message="Try another league or switch between upcoming fixtures and results."
                />
            )}

            {!loading && !error && matches.length > 0 && (
                <div className="space-y-8">
                    {Object.entries(groupedMatches).map(([date, dailyMatches]) => (
                        <section key={date}>
                            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                <h2 className="text-xl font-bold text-white">{date}</h2>
                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                                    {dailyMatches.length} matches
                                </span>
                            </div>

                            <div className="space-y-3">
                                {dailyMatches.map((match) => (
                                    <MatchCard
                                        key={match.matchId}
                                        league={league}
                                        match={match}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </AppShell>
    );
}

export default MatchesPage;
