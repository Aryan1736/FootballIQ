import { useEffect, useState } from "react";
import { getMatches } from "../services/footballService";
import { getFinishedMatches } from "../services/footballService";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";

function MatchesPage() {

    const [matches, setMatches] = useState([]);
    const [league, setLeague] = useState("PL");
    const [showResults,setShowResults] =useState(false);
    const [matchesCache,setMatchesCache] =useState({});

    useEffect(() => {

        const cacheKey =
            `${league}-${showResults}`;

        if(matchesCache[cacheKey]) {

            setMatches(
                matchesCache[cacheKey]
            );

            return;
        }

        const fetchMatches =
            showResults
                ? getFinishedMatches
                : getMatches;

        fetchMatches(league)
            .then((response) => {

                setMatches(
                    response.data
                );

                setMatchesCache(
                    (prev) => ({
                        ...prev,
                        [cacheKey]:
                            response.data
                    })
                );
            })
            .catch((error) => {

                console.log(error);
            });

    }, [
        league,
        showResults,
        matchesCache
    ]);

    const groupedMatches = matches.reduce((groups, match) => {

        const date = new Date(
            match.matchDate
        ).toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(match);

        return groups;

    }, {});

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <Navbar
                league={league}
                setLeague={setLeague}
            />

            <div className="flex gap-4 mb-8">

                <button
                    onClick={() =>
                        setShowResults(false)
                    }
                    className={`px-5 py-2 rounded-xl transition ${
                        !showResults
                            ? "bg-green-500 text-black"
                            : "bg-zinc-800"
                    }`}
                >

                    Upcoming

                </button>

                <button
                    onClick={() =>
                        setShowResults(true)
                    }
                    className={`px-5 py-2 rounded-xl transition ${
                        showResults
                            ? "bg-green-500 text-black"
                            : "bg-zinc-800"
                    }`}
                >

                    Results

                </button>

            </div>

            <div className="space-y-8">

            {Object.entries(groupedMatches).map(
                ([date, dailyMatches]) => (

                    <div
                        key={date}
                        className="space-y-4"
                    >

                        <h2 className="text-2xl font-bold text-zinc-300 border-b border-zinc-800 pb-2">

                            {date}

                        </h2>

                        <div className="space-y-4">

                            {dailyMatches.map((match) => (

                                <MatchCard
                                    league={league}
                                    key={match.matchId}
                                    match={match}
                                />

                            ))}

                        </div>

                    </div>
                )
            )}

        </div>

        </div>
    );
}

export default MatchesPage;