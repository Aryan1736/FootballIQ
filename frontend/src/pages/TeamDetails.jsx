import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getStandings,
    getTeamDetails,
    getTeamPreviousMatches
} from "../services/footballService";
import EmptyState from "../components/EmptyState";
import TeamAnalytics from "../components/TeamAnalytics";
import TeamForm from "../components/TeamForm";
import TeamSkeleton from "../components/TeamSkeleton";

const TeamDetails = () => {
    const { id, leagueCode } = useParams();
    const navigate = useNavigate();

    const [team, setTeam] = useState(null);
    const [matches, setMatches] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        Promise.resolve()
            .then(() => {
                setLoading(true);
                setError("");

                return Promise.all([
                    getTeamDetails(id),
                    getTeamPreviousMatches(id),
                    getStandings(leagueCode)
                ]);
            })
            .then(([teamResponse, matchesResponse, standingsResponse]) => {
                if (cancelled) {
                    return;
                }

                const nextTeam = teamResponse.data;
                const teamAnalytics = standingsResponse.data.find(
                    (club) => club.teamName === nextTeam.name || club.id === Number(id)
                );

                setTeam(nextTeam);
                setMatches(matchesResponse.data);
                setAnalytics(teamAnalytics || null);
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Could not load team details. Try a different club or check the backend.");
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
    }, [id, leagueCode]);

    if (loading) {
        return <TeamSkeleton />;
    }

    if (error || !team) {
        return (
            <div className="min-h-screen bg-[#050608] p-6 text-white">
                <div className="mx-auto max-w-4xl">
                    <EmptyState title="Team unavailable" message={error} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050608] text-white">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-5 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                    Back
                </button>

                <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
                    <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                        <div className="grid h-32 w-32 place-items-center rounded-3xl bg-white/[0.06]">
                            <img
                                src={team.crest}
                                alt=""
                                className="h-24 w-24 object-contain"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                Club profile
                            </p>
                            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                {team.name}
                            </h1>
                            <p className="mt-3 max-w-2xl text-zinc-300">
                                {team.venue} {team.founded ? `since ${team.founded}` : ""}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 lg:w-72">
                            <div className="rounded-2xl bg-zinc-950/50 p-4">
                                <p className="text-xs text-zinc-500">Coach</p>
                                <p className="mt-1 truncate font-bold text-white">
                                    {team.coach?.name || "N/A"}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-zinc-950/50 p-4">
                                <p className="text-xs text-zinc-500">Colors</p>
                                <p className="mt-1 truncate font-bold text-white">
                                    {team.clubColors || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-6">
                        <TeamAnalytics team={analytics} />

                        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                        Squad
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">
                                        Players
                                    </h2>
                                </div>
                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                                    {team.squad?.length || 0}
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[620px]">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-zinc-500">
                                            <th className="py-3 text-left">Name</th>
                                            <th className="py-3 text-left">Position</th>
                                            <th className="py-3 text-left">Nationality</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(team.squad || []).map((player) => (
                                            <tr
                                                key={player.id}
                                                onClick={() => navigate(`/player/${player.id}`)}
                                                className="cursor-pointer border-b border-white/[0.06] transition last:border-0 hover:bg-white/[0.05]"
                                            >
                                                <td className="py-4 font-semibold text-white">
                                                    {player.name}
                                                </td>
                                                <td className="py-4 text-zinc-300">
                                                    {player.position || "N/A"}
                                                </td>
                                                <td className="py-4 text-zinc-400">
                                                    {player.nationality}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <TeamForm matches={matches} teamId={Number(id)} />

                        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                Recent
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-white">
                                Recent Matches
                            </h2>

                            <div className="mt-5 space-y-3">
                                {[...matches].reverse().map((match) => (
                                    <article
                                        key={match.matchId}
                                        className="rounded-2xl border border-white/[0.06] bg-zinc-950/40 p-4"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="min-w-0 truncate text-sm font-semibold text-white">
                                                {match.homeTeam} vs {match.awayTeam}
                                            </p>
                                            <p className="shrink-0 text-lg font-black text-white">
                                                {match.homeScore}:{match.awayScore}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TeamDetails;
