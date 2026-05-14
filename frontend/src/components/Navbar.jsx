import { Link } from "react-router-dom";

function Navbar({ league, setLeague }){

    return (

        <nav className="bg-zinc-900 px-8 py-5 rounded-2xl mb-8 flex items-center justify-between">

            <h1 className="text-3xl font-bold text-white">
                FootballIQ ⚽
            </h1>

            <div className="flex gap-6 text-zinc-300">

                <Link
                    to="/"
                    className="hover:text-white transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/standings"
                    className="hover:text-white transition"
                >
                    Standings
                </Link>

                <Link
                    to="/matches"
                    className="hover:text-white transition"
                >
                    Matches
                </Link>

                <select
                    value={league}
                    onChange={(e) => setLeague(e.target.value)}
                    className="bg-zinc-800 text-white px-4 py-2 rounded-xl outline-none"
                >

                    <option value="PL">Premier League</option>
                    <option value="PD">La Liga</option>
                    <option value="BL1">Bundesliga</option>
                    <option value="SA">Serie A</option>

                </select>

            </div>

        </nav>
    );
}

export default Navbar;