import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTeamDetails,
  getTeamPreviousMatches,
  getStandings
} from "../services/footballService";
import TeamAnalytics from "../components/TeamAnalytics";
import TeamSkeleton from "../components/TeamSkeleton";
import TeamForm from "../components/TeamForm";

const TeamDetails = () => {

  const { id, leagueCode } = useParams();

  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [teamLoading, setTeamLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const [teamCache, setTeamCache] = useState({});
  const [matchesCache, setMatchesCache] = useState({});
  const [analyticsCache, setAnalyticsCache] = useState({});

  useEffect(() => {

      const fetchData = async () => {

          if (
              teamCache[id] &&
              matchesCache[id] &&
              analyticsCache[id]
          ) {

              setTeam(teamCache[id]);
              setMatches(matchesCache[id]);
              setAnalytics(analyticsCache[id]);

              setTeamLoading(false);
              setMatchesLoading(false);
              setAnalyticsLoading(false);

              return;
          }

          try {

              const [
                  teamResponse,
                  matchesResponse,
                  standingsResponse
              ] = await Promise.all([
                  getTeamDetails(id),
                  getTeamPreviousMatches(id),
                  getStandings(leagueCode)
              ]);

              setTeam(teamResponse.data);
              setTeamCache((prev) => ({
                  ...prev,
                  [id]: teamResponse.data
              }));
              setTeamLoading(false);

              setMatches(matchesResponse.data);
              setMatchesCache((prev) => ({
                  ...prev,
                  [id]: matchesResponse.data
              }));
              setMatchesLoading(false);

              const teamAnalytics =
                  standingsResponse.data.find(
                      (club) =>
                          club.teamName ===
                          teamResponse.data.name
                  );

              setAnalytics(teamAnalytics);
              setAnalyticsCache((prev) => ({
                  ...prev,
                  [id]: teamAnalytics
              }));
              setAnalyticsLoading(false);

          } catch (error) {

              console.log(error);
          }
      };

      fetchData();

  }, [id, leagueCode]);

  if (teamLoading) {
      return <TeamSkeleton />;
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

      {analyticsLoading ? (

          <div className="mt-8 bg-zinc-900 rounded-3xl h-52 animate-pulse"></div>

      ) : (

          <div className="mt-8">
              <TeamAnalytics team={analytics} />
          </div>

      )}

      <div className="mt-8">
          <TeamForm
              matches={matches}
              teamId={parseInt(id)}
          />
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

          {matchesLoading ? (

              <div className="space-y-4">

                  {[...Array(5)].map((_, index) => (

                      <div
                          key={index}
                          className="bg-zinc-800 h-20 rounded-2xl animate-pulse"
                      ></div>

                  ))}

              </div>

          ) : (

              <div className="space-y-4">

                  {[...matches].reverse().map((match) => (

                      <div
                          key={match.matchId}
                          className="bg-zinc-800 rounded-2xl p-4 flex justify-between items-center"
                      >

                          <div className="font-medium">

                              {match.homeTeam}

                              <span className="mx-2 text-zinc-400">
                                  vs
                              </span>

                              {match.awayTeam}

                          </div>

                          <div className="text-xl font-bold">

                              {match.homeScore}

                              <span className="mx-2">
                                  :
                              </span>

                              {match.awayScore}

                          </div>

                      </div>

                  ))}

              </div>

          )}

      </div>

    </div>
  );
};

export default TeamDetails;