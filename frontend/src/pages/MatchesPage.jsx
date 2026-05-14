import { useEffect, useState } from "react";
import { getMatches } from "../services/footballService";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";

function MatchesPage() {

    const [matches, setMatches] = useState([]);

    useEffect(() => {

        getMatches()
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <Navbar />

            <div className="space-y-4">

                {matches.map((match, index) => (

                    <MatchCard
                        key={index}
                        match={match}
                    />

                ))}

            </div>

        </div>
    );
}

export default MatchesPage;