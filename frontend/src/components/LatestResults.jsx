import { useNavigate } from "react-router-dom";

function LatestResults({
    results,
    league
}) {

    const navigate =
        useNavigate();

    return (

        <div className="bg-zinc-900 rounded-3xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">

                Latest Results

            </h2>

            <div className="space-y-4">

                {results.map(
                    (match) => {

                        const homeWon =
                            match.homeScore >
                            match.awayScore;

                        const awayWon =
                            match.awayScore >
                            match.homeScore;

                        return (

                            <div
                                key={match.matchId}
                                className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4"
                            >

                                <div className="flex items-center justify-between">

                                    {/* Home */}
                                    <div className="flex items-center gap-3 flex-1 min-w-0">

                                        <img
                                            src={match.homeLogo}
                                            alt={match.homeTeam}
                                            className="w-10 h-10 object-contain"
                                        />

                                       <p className="font-semibold truncate text-white">

                                            {match.homeTeam}

                                       </p>

                                    </div>

                                    {/* Score */}
                                    <div className="flex flex-col items-center px-6">

                                        <p className="text-3xl font-bold text-white">

                                            {match.homeScore}
                                            {" - "}
                                            {match.awayScore}

                                        </p>

                                        <p className="text-xs text-zinc-500">

                                            FT

                                        </p>

                                    </div>

                                    {/* Away */}
                                    <div className="flex items-center justify-end gap-3 flex-1 min-w-0">

                                        <p className="font-semibold truncate text-white">

                                            {match.awayTeam}

                                        </p>

                                        <img
                                            src={match.awayLogo}
                                            alt={match.awayTeam}
                                            className="w-10 h-10 object-contain"
                                        />

                                    </div>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

            <div className="mt-6">

                <button
                    onClick={() =>
                        navigate("/matches?tab=results")
                    }
                    className="text-green-400 font-medium hover:text-green-300 transition"
                >

                    View All Matches →

                </button>

            </div>

        </div>
    );
}

export default LatestResults;