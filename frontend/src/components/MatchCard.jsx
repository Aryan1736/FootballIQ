function MatchCard({ match }) {

    return (

        <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">

            <div className="flex items-center justify-between">

                <div className="flex flex-col items-center gap-2 w-32">

                    <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="w-12 h-12"
                    />

                    <p className="font-semibold text-center">
                        {match.homeTeam}
                    </p>

                </div>

                <p className="text-zinc-400 font-bold text-lg">
                    VS
                </p>

                <div className="flex flex-col items-center gap-2 w-32">

                    <img
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        className="w-12 h-12"
                    />

                    <p className="font-semibold text-center">
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