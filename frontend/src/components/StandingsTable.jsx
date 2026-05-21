import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";

function StandingsTable({ standings, league, compact = false }) {
    const navigate = useNavigate();

    if (!standings.length) {
        return (
            <EmptyState
                title="No standings available"
                message="Try another league or refresh after the football data service responds."
            />
        );
    }

    return (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Table
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-white">
                        League Standings
                    </h2>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                    {standings.length} clubs
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-zinc-500">
                            <th className="px-5 py-4 text-left">Pos</th>
                            <th className="px-5 py-4 text-left">Club</th>
                            <th className="px-3 py-4 text-center">MP</th>
                            <th className="px-3 py-4 text-center">W</th>
                            <th className="px-3 py-4 text-center">D</th>
                            <th className="px-3 py-4 text-center">L</th>
                            {!compact && (
                                <>
                                    <th className="px-3 py-4 text-center">GF</th>
                                    <th className="px-3 py-4 text-center">GA</th>
                                </>
                            )}
                            <th className="px-3 py-4 text-center">GD</th>
                            <th className="px-5 py-4 text-center">Pts</th>
                        </tr>
                    </thead>

                    <tbody>
                        {standings.map((team) => (
                            <tr
                                key={team.id}
                                className="border-b border-white/[0.06] transition last:border-0 hover:bg-white/[0.05]"
                            >
                                <td className="px-5 py-4">
                                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-sm font-bold text-zinc-200">
                                        {team.position}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/team/${team.id}/${league}`)}
                                        className="flex min-w-0 items-center gap-3 text-left"
                                    >
                                        <img
                                            src={team.logo}
                                            alt=""
                                            className="h-9 w-9 object-contain"
                                        />
                                        <span className="font-semibold text-white transition hover:text-emerald-300">
                                            {team.teamName}
                                        </span>
                                    </button>
                                </td>
                                <td className="px-3 py-4 text-center text-zinc-300">
                                    {team.playedGames}
                                </td>
                                <td className="px-3 py-4 text-center font-semibold text-emerald-300">
                                    {team.won}
                                </td>
                                <td className="px-3 py-4 text-center font-semibold text-amber-300">
                                    {team.draw}
                                </td>
                                <td className="px-3 py-4 text-center font-semibold text-rose-300">
                                    {team.lost}
                                </td>
                                {!compact && (
                                    <>
                                        <td className="px-3 py-4 text-center text-zinc-300">
                                            {team.goalsFor}
                                        </td>
                                        <td className="px-3 py-4 text-center text-zinc-300">
                                            {team.goalsAgainst}
                                        </td>
                                    </>
                                )}
                                <td className="px-3 py-4 text-center font-semibold text-zinc-200">
                                    {team.goalDifference > 0 ? "+" : ""}
                                    {team.goalDifference}
                                </td>
                                <td className="px-5 py-4 text-center text-lg font-black text-white">
                                    {team.points}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default StandingsTable;
