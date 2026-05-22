import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import FavoriteButton from "../components/FavoriteButton";
import useFavorites from "../hooks/useFavorites";
import { getPlayerDetails } from "../services/footballService";

function PlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [favoriteSaving, setFavoriteSaving] = useState(false);
    const { playerIds, togglePlayerFavorite } = useFavorites();
    const playerId = Number(id);
    const isFavorite = playerIds.has(playerId);

    useEffect(() => {
        let cancelled = false;

        Promise.resolve()
            .then(() => {
                setLoading(true);
                setError("");
                return getPlayerDetails(id);
            })
            .then((response) => {
                if (!cancelled) {
                    setPlayer(response.data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Could not load player details from the backend.");
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050608] p-6 text-white">
                <div className="mx-auto max-w-5xl space-y-5">
                    <div className="h-64 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="h-48 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                        <div className="h-48 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !player) {
        return (
            <div className="min-h-screen bg-[#050608] p-6 text-white">
                <div className="mx-auto max-w-4xl">
                    <EmptyState title="Player unavailable" message={error} />
                </div>
            </div>
        );
    }

    const handleFavoriteToggle = async () => {
        setFavoriteSaving(true);
        try {
            await togglePlayerFavorite({
                id: playerId,
                name: player.name
            });
        } finally {
            setFavoriteSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050608] text-white">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-5 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                    Back
                </button>

                <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
                    <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                        <div className="grid h-32 w-32 place-items-center rounded-3xl bg-white/[0.06]">
                            <img
                                src={player.teamLogo}
                                alt=""
                                className="h-24 w-24 object-contain"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                Player profile
                            </p>
                            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                {player.name}
                            </h1>
                            <p className="mt-3 text-lg text-zinc-300">
                                {player.position || "Position N/A"} / {player.nationality || "Nationality N/A"}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 md:items-end">
                            <FavoriteButton
                                active={isFavorite}
                                disabled={favoriteSaving}
                                label="Save player"
                                onClick={handleFavoriteToggle}
                            />

                            {player.shirtNumber && (
                                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-emerald-300 text-zinc-950">
                                    <span className="text-4xl font-black">
                                        {player.shirtNumber}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                            Current team
                        </p>
                        <div className="mt-5 flex items-center gap-4">
                            <img
                                src={player.teamLogo}
                                alt=""
                                className="h-16 w-16 object-contain"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-xl font-bold text-white">
                                    {player.currentTeam}
                                </p>
                                <p className="mt-1 text-sm text-zinc-400">
                                    {player.venue}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-zinc-950/50 p-4">
                                <p className="text-xs text-zinc-500">Born</p>
                                <p className="mt-1 font-bold text-white">
                                    {player.dateOfBirth || "N/A"}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-zinc-950/50 p-4">
                                <p className="text-xs text-zinc-500">Founded</p>
                                <p className="mt-1 font-bold text-white">
                                    {player.founded || "N/A"}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-zinc-950/50 p-4">
                                <p className="text-xs text-zinc-500">Contract start</p>
                                <p className="mt-1 font-bold text-white">
                                    {player.contractStart || "N/A"}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-zinc-950/50 p-4">
                                <p className="text-xs text-zinc-500">Contract until</p>
                                <p className="mt-1 font-bold text-white">
                                    {player.contractUntil || "N/A"}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                            Competitions
                        </p>
                        <h2 className="mt-1 text-2xl font-bold text-white">
                            Active Competitions
                        </h2>

                        {player.competitions.length === 0 ? (
                            <div className="mt-5">
                                <EmptyState
                                    title="No competitions"
                                    message="This player has no active competition data from the API."
                                />
                            </div>
                        ) : (
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {player.competitions.map((comp, index) => (
                                    <div
                                        key={comp}
                                        className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-zinc-950/40 p-4"
                                    >
                                        <img
                                            src={player.competitionLogos[index]}
                                            alt=""
                                            className="h-10 w-10 object-contain"
                                        />
                                        <span className="font-semibold text-white">{comp}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PlayerPage;
