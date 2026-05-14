import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTeamDetails,
  getTeamMatches,
} from "../services/footballService";

const TeamDetails = () => {

  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const teamResponse = await getTeamDetails(id);
        const matchesResponse = await getTeamMatches(id);

        setTeam(teamResponse.data);
        setMatches(matchesResponse.data.matches);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [id]);

  if (!team) {
    return (
      <div className="text-white text-center mt-10 text-2xl">
        Loading Team...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Team Header */}
      <div className="bg-zinc-900 rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6">

        <img
          src={team.crest}
          alt={team.name}
          className="w-28 h-28 object-contain"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {team.name}
          </h1>

          <div className="mt-4 space-y-2 text-zinc-300">

            <p>
              Founded: {team.founded}
            </p>

            <p>
              Stadium: {team.venue}
            </p>

            <p>
              Coach: {team.coach?.name || "N/A"}
            </p>

            <p>
              Club Colors: {team.clubColors}
            </p>

          </div>

        </div>
      </div>

      {/* Squad Section */}
      <div className="mt-8 bg-zinc-900 rounded-3xl p-6 shadow-lg">

        <h2 className="text-3xl font-bold mb-6">
          Squad
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-700 text-zinc-400">

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Position
                </th>

                <th className="text-left py-3">
                  Nationality
                </th>

              </tr>

            </thead>

            <tbody>

              {team.squad.map((player) => (

                <tr
                  key={player.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                >

                  <td className="py-4">
                    {player.name}
                  </td>

                  <td className="py-4">
                    {player.position || "N/A"}
                  </td>

                  <td className="py-4">
                    {player.nationality}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Recent Matches */}
      <div className="mt-8 bg-zinc-900 rounded-3xl p-6 shadow-lg">

        <h2 className="text-3xl font-bold mb-6">
          Recent Matches
        </h2>

        <div className="space-y-4">

          {matches.map((match) => (

            <div
              key={match.id}
              className="bg-zinc-800 rounded-2xl p-4 flex justify-between items-center"
            >

              <div className="font-medium">

                {match.homeTeam.name}

                <span className="mx-2 text-zinc-400">
                  vs
                </span>

                {match.awayTeam.name}

              </div>

              <div className="text-xl font-bold">

                {match.score.fullTime.home ?? "-"}

                <span className="mx-2">
                  :
                </span>

                {match.score.fullTime.away ?? "-"}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default TeamDetails;