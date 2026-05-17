import { useNavigate } from "react-router-dom";

function MatchCard({ match, league }) {

    const navigate = useNavigate();

    const matchDate = new Date(match.matchDate);

    const leagueLogos = {
        PL: "https://crests.football-data.org/PL.png",
        PD: "https://crests.football-data.org/PD.png",
        BL1: "https://crests.football-data.org/BL1.png",
        SA: "https://crests.football-data.org/SA.png",
        FL1: "https://crests.football-data.org/FL1.png",
    };

    return (

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition duration-300">

            {/* Top Row */}
            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                    <img
                        src={leagueLogos[league]}
                        alt={league}
                        className="w-15 h-15 object-contain"
                    />


                </div>

                <span className="text-xs text-green-400 font-semibold">
                    {match.status}
                </span>

            </div>

            {/* Teams */}
            <div className="space-y-4">

                {/* Home */}
                <div className="flex items-center justify-between">

                    <div
                        onClick={() =>
                            navigate(`/team/${match.homeTeamId}/${league}`)
                        }
                        className="flex items-center gap-3 cursor-pointer group"
                    >

                        <img
                            src={match.homeLogo}
                            alt={match.homeTeam}
                            className="w-10 h-10 object-contain"
                        />

                        <p className="font-semibold group-hover:text-green-400 transition">
                            {match.homeTeam}
                        </p>

                    </div>

                </div>

                {/* Away */}
                <div className="flex items-center justify-between">

                    <div
                        onClick={() =>
                            navigate(`/team/${match.awayTeamId}/${league}`)
                        }
                        className="flex items-center gap-3 cursor-pointer group"
                    >

                        <img
                            src={match.awayLogo}
                            alt={match.awayTeam}
                            className="w-10 h-10 object-contain"
                        />

                        <p className="font-semibold group-hover:text-green-400 transition">
                            {match.awayTeam}
                        </p>

                    </div>

                </div>

            </div>

            {/* Bottom */}
            <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-sm">

                <span className="text-zinc-400">
                    {matchDate.toLocaleDateString()}
                </span>

                <span className="text-zinc-300 font-medium">
                    {matchDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>

            </div>

        </div>
    );
}

export default MatchCard;