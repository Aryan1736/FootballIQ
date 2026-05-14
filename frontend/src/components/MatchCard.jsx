import { useNavigate } from "react-router-dom";

function MatchCard({ match }) {

    const navigate = useNavigate();
    console.log(match);

    return (

        <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">

            <div className="flex items-center justify-between">

                {/* Home Team */}
                <div className="flex flex-col items-center gap-2 w-32">

                    <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="w-12 h-12"
                    />

                    <p
                        onClick={() => navigate(`/team/${match.homeTeamId}`)}
                        className="font-semibold text-center cursor-pointer hover:text-blue-400 transition"
                    >
                        {match.homeTeam}
                    </p>

                </div>

                <p className="text-zinc-400 font-bold text-lg">
                    VS
                </p>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2 w-32">

                    <img
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        className="w-12 h-12"
                    />

                    <p
                        onClick={() => navigate(`/team/${match.awayTeamId}`)}
                        className="font-semibold text-center cursor-pointer hover:text-blue-400 transition"
                    >
                        {match.awayTeam}
                    </p>

                </div>

            </div>

            <div className="mt-4 text-center text-sm text-zinc-400">

                <p>
                    {new Date(match.matchDate).toLocaleString()}
                </p>

                <p>
                    {match.status}
                </p>

            </div>

        </div>
    );
}

export default MatchCard;