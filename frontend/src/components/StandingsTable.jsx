import { useNavigate } from "react-router-dom";

function StandingsTable({ standings, league }) {

    const navigate = useNavigate();

    return (

        <div>

            <h2 className="text-2xl font-semibold mb-6">
                League Standings
            </h2>

            <div className="space-y-3">

                {standings.map((team, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
                    >

                        <div className="flex items-center gap-4">

                            <span className="font-bold w-6">
                                {team.position}
                            </span>

                            <img
                                src={team.logo}
                                alt={team.teamName}
                                className="w-8 h-8"
                            />

                            <span
                                onClick={() =>
                                    navigate(`/team/${team.id}/${league}`)
                                }
                                className="cursor-pointer hover:text-blue-400 transition"
                            >
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
    );
}

export default StandingsTable;