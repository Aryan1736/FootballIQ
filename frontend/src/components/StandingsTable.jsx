import { useNavigate } from "react-router-dom";

function StandingsTable({ standings, league }) {

    const navigate = useNavigate();

    return (

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg overflow-x-auto">

            <h2 className="text-3xl font-bold mb-6">
                League Standings
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="border-b border-zinc-700 text-zinc-400">

                        <th className="py-4 text-left">#</th>

                        <th className="py-4 text-left">
                            Club
                        </th>

                        <th className="py-4 text-center">
                            MP
                        </th>

                        <th className="py-4 text-center">
                            W
                        </th>

                        <th className="py-4 text-center">
                            D
                        </th>

                        <th className="py-4 text-center">
                            L
                        </th>

                        <th className="py-4 text-center">
                            GF
                        </th>

                        <th className="py-4 text-center">
                            GA
                        </th>

                        <th className="py-4 text-center">
                            GD
                        </th>

                        <th className="py-4 text-center">
                            PTS
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {standings.map((team) => (

                        <tr
                            key={team.id}
                            className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                        >

                            {/* Position */}
                            <td className="py-5 font-bold">
                                {team.position}
                            </td>

                            {/* Team */}
                            <td className="py-5">

                                <div className="flex items-center gap-3">

                                    <img
                                        src={team.logo}
                                        alt={team.teamName}
                                        className="w-8 h-8"
                                    />

                                    <span
                                        onClick={() =>
                                            navigate(`/team/${team.id}/${league}`)
                                        }
                                        className="cursor-pointer hover:text-green-400 transition font-medium"
                                    >
                                        {team.teamName}
                                    </span>

                                </div>

                            </td>

                            {/* Stats */}
                            <td className="text-center">
                                {team.playedGames}
                            </td>

                            <td className="text-center text-green-400 font-semibold">
                                {team.won}
                            </td>

                            <td className="text-center text-yellow-400 font-semibold">
                                {team.draw}
                            </td>

                            <td className="text-center text-red-400 font-semibold">
                                {team.lost}
                            </td>

                            <td className="text-center">
                                {team.goalsFor}
                            </td>

                            <td className="text-center">
                                {team.goalsAgainst}
                            </td>

                            <td className="text-center font-semibold">

                                {team.goalDifference > 0 ? "+" : ""}
                                {team.goalDifference}

                            </td>

                            <td className="text-center text-green-400 font-bold">
                                {team.points}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default StandingsTable;