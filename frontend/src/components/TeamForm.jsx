import EmptyState from "./EmptyState";

function TeamForm({ matches, teamId }) {
    const finishedMatches = [...matches].reverse().slice(0, 5);

    const getResult = (match) => {
        const homeGoals = match.homeScore;
        const awayGoals = match.awayScore;
        const isHome = match.homeTeamId === teamId;

        if (homeGoals === awayGoals) {
            return "D";
        }

        if (isHome) {
            return homeGoals > awayGoals ? "W" : "L";
        }

        return awayGoals > homeGoals ? "W" : "L";
    };

    const getColor = (result) => {
        if (result === "W") {
            return "bg-emerald-300 text-zinc-950";
        }

        if (result === "D") {
            return "bg-amber-300 text-zinc-950";
        }

        return "bg-rose-300 text-zinc-950";
    };

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Form
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">Recent Form</h2>

            {finishedMatches.length === 0 ? (
                <div className="mt-5">
                    <EmptyState
                        title="No form data"
                        message="Recent finished matches will appear here when available."
                    />
                </div>
            ) : (
                <div className="mt-5 flex flex-wrap gap-3">
                    {finishedMatches.map((match) => {
                        const result = getResult(match);

                        return (
                            <div
                                key={match.matchId}
                                className={`grid h-14 w-14 place-items-center rounded-2xl text-lg font-black ${getColor(result)}`}
                                title={`${match.homeTeam} ${match.homeScore}-${match.awayScore} ${match.awayTeam}`}
                            >
                                {result}
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default TeamForm;
