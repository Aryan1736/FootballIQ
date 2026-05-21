import { useEffect, useState } from "react";
import { getStandings } from "../services/footballService";
import StandingsTable from "../components/StandingsTable";
import Navbar from "../components/Navbar";

function StandingsPage() {

    const [standings, setStandings] = useState([]);
    const [league, setLeague] = useState(localStorage.getItem("league")|| "PL")

    useEffect(() => {

        localStorage.setItem(
            "league",
            league
        );

        getStandings(league)
            .then((response) => {
                setStandings(response.data);
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

            <StandingsTable standings={standings} league={league} />

        </div>
    );
}

export default StandingsPage;