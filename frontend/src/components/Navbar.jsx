import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchEntities } from "../services/footballService";

function Navbar({ league, setLeague }){

    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const handleSearch = (value) => {

        setQuery(value);

        if (
            value.trim().length < 2
        ) {

            setResults([]);
            return;
        }

        searchEntities(value)

            .then((response) => {

                setResults(
                    response.data
                );
            })

            .catch((error) => {

                console.log(error);
            });
    };

    return (

        <nav className="bg-zinc-900 px-8 py-5 rounded-2xl mb-8 flex items-center justify-between">

            {/* Logo */}
            <h1 className="text-3xl font-bold text-white">

                FootballIQ ⚽

            </h1>

            {/* Right Section */}
            <div className="flex items-center gap-5">

                {/* Links */}
                <div className="flex items-center gap-6 text-zinc-300">

                    <Link
                        to="/"
                        className="hover:text-green-400 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/standings"
                        className="hover:text-green-400 transition"
                    >
                        Standings
                    </Link>

                    <Link
                        to="/matches"
                        className="hover:text-green-400 transition"
                    >
                        Matches
                    </Link>

                </div>

                {/* Search */}
                <div className="relative w-72">

                    <input
                        type="text"
                        value={query}
                        onChange={(e) =>
                            handleSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search teams or players..."
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-green-500 transition"
                    />

                    {results.length > 0 && (

                        <div className="absolute top-14 left-0 w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden">

                            {results.map(
                                (item) => (

                                    <div
                                        key={
                                            item.type
                                            + item.id
                                        }
                                        onClick={() => {

                                            if(
                                                item.type
                                                === "TEAM"
                                            ) {

                                                navigate(
                                                    `/team/${item.id}/${league}`
                                                );

                                            } else {

                                                navigate(
                                                    `/player/${item.id}`
                                                );
                                            }

                                            setResults([]);
                                            setQuery("");
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 cursor-pointer transition"
                                    >

                                        {item.logo && (

                                            <img
                                                src={item.logo}
                                                alt=""
                                                className="w-7 h-7 object-contain"
                                            />
                                        )}

                                        <div>

                                            <p className="text-white font-medium">

                                                {item.name}

                                            </p>

                                            <p className="text-xs text-zinc-500">

                                                {item.type}

                                            </p>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

                {/* League */}
                <select
                    value={league}
                    onChange={(e) =>
                        setLeague(
                            e.target.value
                        )
                    }
                    className="bg-zinc-800 border border-zinc-700 text-white px-4 py-2.5 rounded-xl outline-none focus:border-green-500 transition"
                >

                    <option value="PL">
                        Premier League
                    </option>

                    <option value="PD">
                        La Liga
                    </option>

                    <option value="BL1">
                        Bundesliga
                    </option>

                    <option value="SA">
                        Serie A
                    </option>

                </select>

            </div>

        </nav>
    );
}

export default Navbar;