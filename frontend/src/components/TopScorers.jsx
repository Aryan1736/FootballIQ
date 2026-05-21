import { useNavigate } from "react-router-dom";

function TopScorers({ scorers }) {

    const navigate =  useNavigate();

    return (

        <div className="bg-zinc-900 rounded-3xl p-6 shadow-lg">

            <div className="flex items-center gap-2 mb-6">

                <h2 className="text-2xl font-bold">
                    Top Scorers
                </h2>

            </div>

            <div className="space-y-4">

                {scorers.map(
                    (scorer, index) => (

                        <div
                            key={scorer.playerId}
                            onClick={() =>
                                navigate(
                                    `/player/${scorer.playerId}`
                                )
                            }
                            className="flex items-center justify-between bg-zinc-800 rounded-2xl px-4 py-3 hover:bg-zinc-700 hover:text-green-400 transition cursor-pointer"
                        >

                            <div className="flex items-center gap-4">

                                <span className="text-zinc-400 font-bold w-5">

                                    {index + 1}

                                </span>

                                <img
                                    src={scorer.teamLogo}
                                    alt={scorer.teamName}
                                    className="w-10 h-10 object-contain"
                                />

                                <div>

                                    <p className="font-semibold">

                                        {scorer.playerName}

                                    </p>

                                    <p className="text-sm text-zinc-400">

                                        {scorer.teamName}

                                    </p>

                                </div>

                            </div>

                            <div className="text-right">

                                <p className="text-green-400 font-bold text-xl">

                                    {scorer.goals}

                                </p>

                                <p className="text-xs text-zinc-500">

                                    Goals

                                </p>

                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default TopScorers;