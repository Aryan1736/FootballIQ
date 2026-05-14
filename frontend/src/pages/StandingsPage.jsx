import { useEffect, useState } from "react";
import { getStandings } from "../services/footballService";
import StandingsTable from "../components/StandingsTable";
import Navbar from "../components/Navbar";

function StandingsPage() {

    const [standings, setStandings] = useState([]);

    useEffect(() => {

        getStandings()
            .then((response) => {
                setStandings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <Navbar />

            <StandingsTable standings={standings} />

        </div>
    );
}

export default StandingsPage;