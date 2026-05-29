import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

function MyFootballIQ({
    isAuthenticated,
    teamFavorites = [],
    playerFavorites = [],
    league
}) {
    const hasFavorites = teamFavorites.length > 0 || playerFavorites.length > 0;
    const savedCount = teamFavorites.length + playerFavorites.length;

    return (
        <section className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5 shadow-2xl shadow-black/20">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        My FootballIQ
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-white">
                        Your saved football world
                    </h2>
                </div>

                <div className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-zinc-950">
                    {isAuthenticated ? `${savedCount} saved` : "Personalize"}
                </div>
            </div>

            {!isAuthenticated ? (
                <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/40 p-5">
                    <p className="text-lg font-bold text-white">
                        Follow clubs and players
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                        Log in to save your favorite teams and players, then FootballIQ will keep them together here.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            to="/login"
                            className="rounded-full bg-emerald-300 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-emerald-200"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            ) : !hasFavorites ? (
                <EmptyState
                    title="No favorites yet"
                    message="Save teams and players from their detail pages to personalize this dashboard."
                />
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/40 p-4">
                        <p className="text-sm font-semibold text-zinc-300">
                            Favorite teams
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {teamFavorites.map((favorite) => (
                                <Link
                                    key={favorite.teamId}
                                    to={`/team/${favorite.teamId}/${league}`}
                                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white transition hover:border-emerald-300/30 hover:bg-white/[0.10]"
                                >
                                    {favorite.teamLogo && (
                                        <img
                                            src={favorite.teamLogo}
                                            alt=""
                                            className="h-5 w-5 object-contain"
                                        />
                                    )}
                                    <span>
                                        {favorite.teamName}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/40 p-4">
                        <p className="text-sm font-semibold text-zinc-300">
                            Favorite players
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {playerFavorites.map((favorite) => (
                                <Link
                                    key={favorite.playerId}
                                    to={`/player/${favorite.playerId}`}
                                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white transition hover:border-emerald-300/30 hover:bg-white/[0.10]"
                                >
                                    {favorite.playerName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default MyFootballIQ;
