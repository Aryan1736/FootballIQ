import { useNavigate } from "react-router-dom";
import { getLeague } from "../lib/leagues";

function MatchCard({ match, league }) {
    const navigate = useNavigate();
    const matchDate = new Date(match.matchDate);
    const isFinished = match.homeScore !== null && match.homeScore !== undefined;
    const selectedLeague = getLeague(league);

    const openTeam = (teamId) => {
        navigate(`/team/${teamId}/${league}`);
    };

    return (
        <article className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-emerald-300/50 hover:bg-white/[0.07]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <img
                        src={selectedLeague.logo}
                        alt=""
                        className="h-6 w-6 object-contain"
                    />
                    <span>{selectedLeague.name}</span>
                </div>

                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {isFinished ? "Full time" : match.status}
                </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <button
                    type="button"
                    onClick={() => openTeam(match.homeTeamId)}
                    className="flex min-w-0 items-center gap-3 text-left"
                >
                    <img
                        src={match.homeLogo}
                        alt=""
                        className="h-11 w-11 object-contain"
                    />
                    <span className="truncate font-semibold text-white group-hover:text-emerald-100">
                        {match.homeTeam}
                    </span>
                </button>

                <div className="min-w-28 rounded-2xl bg-zinc-950/70 px-4 py-3 text-center">
                    {isFinished ? (
                        <>
                            <p className="text-2xl font-black text-white">
                                {match.homeScore} - {match.awayScore}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                                FT
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-black text-emerald-300">
                                {matchDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                {matchDate.toLocaleDateString()}
                            </p>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => openTeam(match.awayTeamId)}
                    className="flex min-w-0 items-center justify-end gap-3 text-right"
                >
                    <span className="truncate font-semibold text-white group-hover:text-emerald-100">
                        {match.awayTeam}
                    </span>
                    <img
                        src={match.awayLogo}
                        alt=""
                        className="h-11 w-11 object-contain"
                    />
                </button>
            </div>
        </article>
    );
}

export default MatchCard;
