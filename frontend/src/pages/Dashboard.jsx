import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getFinishedMatches,
    getMatches,
    getStandings,
    getTopScorers
} from "../services/footballService";
import AppShell from "../components/AppShell";
import EmptyState from "../components/EmptyState";
import LatestResults from "../components/LatestResults";
import MatchCard from "../components/MatchCard";
import StandingsTable from "../components/StandingsTable";
import TopScorers from "../components/TopScorers";
import DashboardSkeleton from "../components/DashboardSkeleton";
import { getLeague } from "../lib/leagues";
import { useAuth } from "../context/useAuth";
import useFavorites from "../hooks/useFavorites";
import MyFootballIQ from "../components/MyFootballIQ";

function Dashboard() {
    const [league, setLeague] = useState(localStorage.getItem("league") || "PL");
    const [standings, setStandings] = useState([]);
    const [matches, setMatches] = useState([]);
    const [scorers, setScorers] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();
    const { teamFavorites, playerFavorites } = useFavorites();
    const selectedLeague = getLeague(league);

    useEffect(() => {
        let cancelled = false;
        localStorage.setItem("league", league);

        Promise.resolve()
            .then(() => {
                setLoading(true);
                setError("");

                return Promise.all([
                    getStandings(league),
                    getMatches(league),
                    getTopScorers(league),
                    getFinishedMatches(league)
                ]);
            })
            .then(([standingsResponse, matchesResponse, scorersResponse, resultsResponse]) => {
                if (cancelled) {
                    return;
                }

                setStandings(standingsResponse.data);
                setMatches(matchesResponse.data);
                setScorers(scorersResponse.data);
                setResults(resultsResponse.data.slice(0, 5));
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Football data is unavailable right now. Check the backend or API key and try again.");
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
    }, [league]);

    if (loading) {
        return <DashboardSkeleton league={league} setLeague={setLeague} />;
    }

    const leader = standings[0];
    const nextMatch = matches[0];
    const topScorer = scorers[0];

    return (
        <AppShell
            league={league}
            setLeague={setLeague}
            eyebrow={selectedLeague.shortName}
            title={`${selectedLeague.name} command center`}
            description="Track the table, upcoming fixtures, latest results, and player form from a single matchday view."
            meta={[
                { label: "Clubs", value: standings.length || "--" },
                { label: "Fixtures", value: matches.length || "--" }
            ]}
        >
            {error && <EmptyState title="Could not load dashboard" message={error} />}

            {!error && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                    <section className="space-y-6">
                        {isAuthenticated && (
                            <MyFootballIQ
                                teamFavorites={teamFavorites}
                                playerFavorites={playerFavorites}
                                league={league}
                            />
                        )}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                                    League leader
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    {leader && (
                                        <img
                                            src={leader.logo}
                                            alt=""
                                            className="h-12 w-12 object-contain"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <p className="truncate text-lg font-bold text-white">
                                            {leader?.teamName || "No leader"}
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {leader ? `${leader.points} points` : "Waiting for standings"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                                    Next kickoff
                                </p>
                                <p className="mt-4 truncate text-lg font-bold text-white">
                                    {nextMatch ? `${nextMatch.homeTeam} vs ${nextMatch.awayTeam}` : "No fixture"}
                                </p>
                                <p className="mt-1 text-sm text-zinc-400">
                                    {nextMatch ? new Date(nextMatch.matchDate).toLocaleString() : "Schedule unavailable"}
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                                    Golden boot
                                </p>
                                <p className="mt-4 truncate text-lg font-bold text-white">
                                    {topScorer?.playerName || "No scorer"}
                                </p>
                                <p className="mt-1 text-sm text-zinc-400">
                                    {topScorer ? `${topScorer.goals} goals for ${topScorer.teamName}` : "Scorer data unavailable"}
                                </p>
                            </div>
                        </div>

                        <StandingsTable standings={standings.slice(0, 6)} league={league} compact />

                        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                        Fixtures
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold text-white">
                                        Upcoming Matches
                                    </h2>
                                </div>
                                <Link
                                    to="/matches"
                                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {matches.slice(0, 4).map((match) => (
                                    <MatchCard key={match.matchId} league={league} match={match} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <TopScorers scorers={scorers} />
                        <LatestResults results={results} />
                    </aside>
                </div>
            )}
        </AppShell>
    );
}

export default Dashboard;
