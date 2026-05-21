import { useNavigate } from "react-router-dom";

function MatchCard({ match, league }) {

    const navigate = useNavigate();

    const matchDate =
        new Date(match.matchDate);

    const leagueLogos = {
        PL: "https://crests.football-data.org/PL.png",
        PD: "https://crests.football-data.org/PD.png",
        BL1: "https://crests.football-data.org/BL1.png",
        SA: "https://crests.football-data.org/SA.png",
        FL1: "https://crests.football-data.org/FL1.png",
    };

    return (

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition duration-300">

            {/* Top */}
            <div className="flex items-center justify-between mb-4">

                <img
                    src={leagueLogos[league]}
                    alt={league}
                    className="w-8 h-8 object-contain"
                />

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-400">

                    {match.status}

                </span>

            </div>

            {/* Fixture Row */}
            <div className="flex items-center justify-between">

                {/* Home */}
                <div
                    onClick={(e) => {

                        e.stopPropagation();

                        navigate(
                            `/team/${match.homeTeamId}/${league}`
                        );
                    }}
                    className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
                >

                    <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="w-10 h-10 object-contain"
                    />

                    <p className="font-semibold group-hover:text-green-400 transition text-sm md:text-base">

                        {match.homeTeam}

                    </p>

                </div>

                {/* Center */}
                <div className="flex flex-col items-center min-w-[100px]">

                    {match.homeScore != null ? (

                        <>
                            <h2 className="text-3xl font-bold text-white">

                                {match.homeScore}
                                {" - "}
                                {match.awayScore}

                            </h2>

                            <p className="text-xs text-zinc-500">

                                FT

                            </p>
                        </>

                    ) : (

                        <>
                            <p className="text-xl font-bold text-green-400">

                                {matchDate.toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}

                            </p>

                            <p className="text-xs text-zinc-500">

                                {matchDate.toLocaleDateString()}

                            </p>
                        </>
                    )}

                </div>

                {/* Away */}
                <div
                    onClick={(e) => {

                        e.stopPropagation();

                        navigate(
                            `/team/${match.awayTeamId}/${league}`
                        );
                    }}
                    className="flex items-center justify-end gap-3 cursor-pointer group flex-1 min-w-0"
                >

                    <p className="font-semibold group-hover:text-green-400 transition text-right text-sm md:text-base">

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

export default MatchCard;