import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { searchEntities } from "../services/footballService";
import { LEAGUES, getLeague } from "../lib/leagues";
import { useAuth } from "../context/useAuth";

function Navbar({ league, setLeague }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const selectedLeague = getLeague(league);

    const navClass = ({ isActive }) =>
        [
            "rounded-full px-4 py-2 text-sm font-medium transition",
            isActive
                ? "bg-white text-zinc-950"
                : "text-zinc-300 hover:bg-white/10 hover:text-white"
        ].join(" ");

    const handleSearch = (value) => {
        setQuery(value);

        if (value.trim().length < 2) {
            setResults([]);
            return;
        }

        setSearching(true);
        searchEntities(value)
            .then((response) => {
                setResults(response.data.slice(0, 8));
            })
            .catch(() => {
                setResults([]);
            })
            .finally(() => {
                setSearching(false);
            });
    };

    const openResult = (item) => {
        if (item.type === "TEAM") {
            navigate(`/team/${item.id}/${league}`);
        } else {
            navigate(`/player/${item.id}`);
        }

        setResults([]);
        setQuery("");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="sticky top-4 z-40 rounded-3xl border border-white/10 bg-zinc-950/85 p-3 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 text-lg font-black text-zinc-950">
                            FQ
                        </span>
                        <span>
                            <span className="block text-lg font-bold leading-none text-white">
                                FootballIQ
                            </span>
                            <span className="mt-1 block text-xs text-zinc-500">
                                Live football intelligence
                            </span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 lg:hidden">
                        <img
                            src={selectedLeague.logo}
                            alt=""
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex rounded-full bg-white/5 p-1">
                        <NavLink to="/" className={navClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/standings" className={navClass}>
                            Standings
                        </NavLink>
                        <NavLink to="/matches" className={navClass}>
                            Matches
                        </NavLink>
                    </div>

                    <div className="relative min-w-0 lg:w-80">
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => handleSearch(event.target.value)}
                            placeholder="Search clubs or players"
                            className="h-11 w-full rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-300 focus:bg-white/[0.09]"
                        />

                        {(results.length > 0 || searching) && (
                            <div className="absolute left-0 right-0 top-14 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
                                {searching && (
                                    <div className="px-4 py-3 text-sm text-zinc-400">
                                        Searching...
                                    </div>
                                )}

                                {results.map((item) => (
                                    <button
                                        key={`${item.type}-${item.id}`}
                                        type="button"
                                        onClick={() => openResult(item)}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/10"
                                    >
                                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                                            {item.logo ? (
                                                <img
                                                    src={item.logo}
                                                    alt=""
                                                    className="h-7 w-7 object-contain"
                                                />
                                            ) : (
                                                <span className="text-xs font-bold text-emerald-300">
                                                    {item.type.slice(0, 1)}
                                                </span>
                                            )}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-semibold text-white">
                                                {item.name}
                                            </span>
                                            <span className="text-xs text-zinc-500">
                                                {item.type.toLowerCase()}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3">
                        <img
                            src={selectedLeague.logo}
                            alt=""
                            className="h-6 w-6 object-contain"
                        />
                        <select
                            value={league}
                            onChange={(event) => setLeague(event.target.value)}
                            className="bg-transparent text-sm font-semibold text-white outline-none"
                        >
                            {LEAGUES.map((item) => (
                                <option key={item.code} value={item.code} className="bg-zinc-950">
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] p-1 pl-4">
                            <span className="max-w-32 truncate text-sm font-semibold text-white">
                                {user.username}
                            </span>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-emerald-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex rounded-full border border-white/10 bg-white/[0.06] p-1">
                            <NavLink to="/login" className={navClass}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={navClass}>
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
