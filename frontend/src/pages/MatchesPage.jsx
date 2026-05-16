import { useEffect, useState } from "react";
import { getMatches } from "../services/footballService";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";

function MatchesPage() {

    const [matches, setMatches] = useState([]);
    const [league, setLeague] = useState("PL");

    useEffect(() => {

        getMatches(league)
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [league]);

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <Navbar
                league={league}
                setLeague={setLeague}
            />

            <div className="space-y-4">

                {matches.map((match, index) => (

                    <MatchCard 
                        league={league}
                        key={index}
                        match={match}
                    />

                ))}

            </div>

        </div>
    );
}

export default MatchesPage;