import { useEffect, useState } from "react";
import { getStandings, getMatches } from "../services/footballService";

function Dashboard() {

    const [standings, setStandings] = useState([]);
    const [matches, setMatches] = useState([]);

    useEffect(() => {

        getStandings()
            .then((response) => {
                setStandings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getMatches()
            .then((response) => {
                setMatches(response.data.slice(0, 10));
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8">

            <h1 className="text-5xl font-bold mb-10">
                FootballIQ ⚽
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Standings Section */}
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-2xl font-semibold mb-6">
                        Premier League Standings
                    </h2>

                    <div className="space-y-3">

                        {standings.map((team, index) => (

                            <div
                                key={index}
                                className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
                            >

                                <div className="flex gap-4">

                                    <span className="font-bold">
                                        {team.position}
                                    </span>

                                    <span>
                                        {team.teamName}
                                    </span>

                                </div>

                                <span className="font-semibold text-green-400">
                                    {team.points} pts
                                </span>

                            </div>
                        ))}

                    </div>

                </div>

                {/* Matches Section */}
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-2xl font-semibold mb-6">
                        Upcoming Matches
                    </h2>

                    <div className="space-y-4">

                        {matches.map((match, index) => (

                            <div
                                key={index}
                                className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
                            >

                                <p className="font-semibold text-lg">
                                    {match.homeTeam}
                                </p>

                                <p className="text-center text-sm text-zinc-400 my-2">
                                    VS
                                </p>

                                <p className="font-semibold text-lg">
                                    {match.awayTeam}
                                </p>

                                <div className="mt-3 text-sm text-zinc-400">

                                    <p>
                                        {match.matchDate}
                                    </p>

                                    <p>
                                        {match.status}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;