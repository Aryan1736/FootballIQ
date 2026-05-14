import { useEffect, useState } from "react";
import { getStandings, getMatches } from "../services/footballService";
import MatchCard from "../components/MatchCard";
import StandingsTable from "../components/StandingsTable";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {

    const [standings, setStandings] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [league, setLeague] = useState("PL");

    useEffect(() => {

        Promise.all([
            getStandings(league),
            getMatches(league)
        ])
        .then(([standingsResponse, matchesResponse]) => {

            setStandings(standingsResponse.data);
            setMatches(matchesResponse.data);

            setLoading(false);

        })
        .catch((error) => {
            console.log(error);
        });

    }, [league]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Loading Live Football Data ⚽
                </h1>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <Navbar
                league={league}
                setLeague={setLeague}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <StandingsTable standings={standings.slice(0, 5)} />

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

            </div>

        </div>
    );
}

export default Dashboard;