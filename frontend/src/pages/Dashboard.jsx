import { useEffect, useState } from "react";
import { getStandings, getMatches, getTopScorers, getFinishedMatches } from "../services/footballService";
import MatchCard from "../components/MatchCard";
import StandingsTable from "../components/StandingsTable";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import DashboardSkeleton from "../components/DashboardSkeleton";
import TopScorers from "../components/TopScorers";
import LatestResults from "../components/LatestResults";


function Dashboard() {

    const [standings, setStandings] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [league, setLeague] = useState(localStorage.getItem("league")|| "PL")
    const [standingsCache, setStandingsCache] = useState({});
    const [matchesCache, setMatchesCache] = useState({});
    const [scorers,setScorers] =useState([]);
    const [scorersCache,setScorersCache] =useState({});
    const [results,setResults] =useState([]);
    const [resultsCache,setResultsCache] =useState({});

    useEffect(() => {

        localStorage.setItem(
            "league",
            league
        );

        const cacheKey =
            league;

        if(scorersCache[cacheKey]) {

            setScorers(
                scorersCache[cacheKey]
            );

        } else {

            getTopScorers(league)
                .then((response) => {

                    setScorers(
                        response.data
                    );

                    setScorersCache(
                        (prev) => ({
                            ...prev,
                            [cacheKey]:
                                response.data
                        })
                    );
                });
        }

        if(resultsCache[league]) {

            setResults(
                resultsCache[league]
            );

        } else {

            getFinishedMatches(league)
                .then((response) => {

                    const latest =
                        response.data
                            .slice(0, 5);

                    setResults(
                        latest
                    );

                    setResultsCache(
                        (prev) => ({
                            ...prev,
                            [league]:
                                latest
                        })
                    );
                });
        }

        const fetchLeagueData = async () => {

            const leagues = [
                "PL",
                "PD",
                "BL1",
                "SA",
                "FL1"
            ];

            leagues.forEach(async (code) => {

                if (
                    code !== league &&
                    !standingsCache[code]
                ) {

                    try {

                        const [
                            standingsResponse,
                            matchesResponse
                        ] = await Promise.all([
                            getStandings(code),
                            getMatches(code)
                        ]);

                        setStandingsCache((prev) => ({
                            ...prev,
                            [code]: standingsResponse.data
                        }));

                        setMatchesCache((prev) => ({
                            ...prev,
                            [code]: matchesResponse.data
                        }));

                    } catch (error) {

                        console.log(error);
                    }
                }
            });

            setLoading(true);

            // Use cached data instantly
            if (
                standingsCache[league] &&
                matchesCache[league]
            ) {

                setStandings(
                    standingsCache[league]
                );

                setMatches(
                    matchesCache[league]
                );

                setLoading(false);

                return;
            }

            try {

                const [
                    standingsResponse,
                    matchesResponse
                ] = await Promise.all([
                    getStandings(league),
                    getMatches(league)
                ]);

                const standingsData =
                    standingsResponse.data;

                const matchesData =
                    matchesResponse.data;

                setStandings(standingsData);
                setMatches(matchesData);

                // Save in cache
                setStandingsCache((prev) => ({
                    ...prev,
                    [league]: standingsData
                }));

                setMatchesCache((prev) => ({
                    ...prev,
                    [league]: matchesData
                }));

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchLeagueData();

    }, [league]);

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <Navbar
                league={league}
                setLeague={setLeague}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <StandingsTable standings={standings.slice(0, 5)} league={league} />

                    <Link
                        to="/standings"
                        className="text-green-400 hover:text-green-300 mt-6 inline-block"
                    >
                        View Full Standings →
                    </Link>

                </div>

                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <h2 className="text-2xl font-semibold mb-6">
                        Upcoming Matches
                    </h2>

                    <div className="space-y-4">

                        {matches.slice(0, 3).map((match, index) => (

                            <MatchCard
                                league={league}
                                key={index}
                                match={match}
                            />

                        ))}

                    </div>

                    <Link
                        to="/matches"
                        className="text-green-400 hover:text-green-300 mt-6 inline-block"
                    >
                        View All Matches →
                    </Link>

                </div>

                <div className="mt-8">

                    <TopScorers
                        scorers={scorers}
                    />

                </div>

                <div className="mt-8">

                    <LatestResults
                        results={results}
                         league={league}
                    />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;