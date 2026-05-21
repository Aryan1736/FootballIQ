import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerDetails } from "../services/footballService";

function PlayerPage() {

    const { id } =
        useParams();

    const [player,
        setPlayer] =
        useState(null);

    useEffect(() => {

        getPlayerDetails(id)
            .then((response) => {

                setPlayer(
                    response.data
                );
            })
            .catch((error) => {

                console.log(error);
            });

    }, [id]);

    if(!player) {

        return (

            <div className="min-h-screen bg-black text-white p-8">

                Loading...

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-black text-white p-8">

            {/* Hero */}

            <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">

                <div className="flex items-center gap-6">

                    <img
                        src={player.teamLogo}
                        alt={player.currentTeam}
                        className="w-24 h-24 object-contain"
                    />

                    <div>

                        <h1 className="text-4xl font-bold">

                            {player.name}

                        </h1>

                        <p className="text-zinc-400 mt-2">

                            {player.position}
                            {" • "}
                            {player.nationality}

                        </p>

                        <p className="text-zinc-500 mt-1">

                            Born:
                            {" "}
                            {player.dateOfBirth}

                        </p>

                        {player.shirtNumber && (

                            <p className="text-green-400 mt-2">

                                #{player.shirtNumber}

                            </p>
                        )}

                    </div>

                </div>

            </div>

            {/* Club */}

            <div className="mt-8 bg-zinc-900 rounded-3xl p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Current Team

                </h2>

                <div className="flex items-center gap-4">

                    <img
                        src={player.teamLogo}
                        alt={player.currentTeam}
                        className="w-16 h-16"
                    />

                    <div>

                        <p className="font-semibold">

                            {player.currentTeam}

                        </p>

                        <p className="text-zinc-400">

                            {player.venue}

                        </p>

                        <p className="text-zinc-500">

                            Founded {player.founded}

                        </p>

                    </div>

                </div>

            </div>

            {/* Competitions */}

            <div className="mt-8 bg-zinc-900 rounded-3xl p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Competitions

                </h2>

                <div className="flex gap-4 flex-wrap">

                    {player.competitions.map(
                        (comp, index) => (

                            <div
                                key={index}
                                className="bg-zinc-800 rounded-2xl px-4 py-3 flex items-center gap-3"
                            >

                                <img
                                    src={
                                        player.competitionLogos[
                                            index
                                        ]
                                    }
                                    alt={comp}
                                    className="w-8 h-8"
                                />

                                <span>

                                    {comp}

                                </span>

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>
    );
}

export default PlayerPage;