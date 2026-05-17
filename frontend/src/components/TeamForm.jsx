function TeamForm({ matches, teamId }) {

    const finishedMatches = [...matches]
    .reverse()
    .slice(0, 5);
    const getResult = (match) => {

        const homeGoals = match.homeScore;
        const awayGoals = match.awayScore;

        const isHome =
            match.homeTeamId === teamId;

        if(homeGoals === awayGoals) {
            return "D";
        }

        if(isHome) {
            return homeGoals > awayGoals
                ? "W"
                : "L";
        }

        return awayGoals > homeGoals
            ? "W"
            : "L";
    };

    const getColor = (result) => {

        if(result === "W") {
            return "bg-green-500";
        }

        if(result === "D") {
            return "bg-yellow-500";
        }

        return "bg-red-500";
    };

    return (

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
                Recent Form
            </h2>

            <div className="flex gap-4">

                {finishedMatches.map((match, index) => {

                    const result =
                        getResult(match);

                    return (

                        <div
                            key={index}
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${getColor(result)}`}
                        >

                            {result}

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default TeamForm;