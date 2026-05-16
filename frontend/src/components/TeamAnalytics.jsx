import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function TeamAnalytics({ team }) {

    const chartData = [
        { name: "Wins", value: team.won },
        { name: "Draws", value: team.draw },
        { name: "Losses", value: team.lost }
    ];

    return (

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-bold text-white">
                        Team Analytics
                    </h2>

                    <p className="text-zinc-400 mt-1">
                        Season performance overview
                    </p>

                </div>

                <div className="bg-zinc-800 px-5 py-3 rounded-2xl">

                    <p className="text-zinc-400 text-sm">
                        Points
                    </p>

                    <h3 className="text-3xl font-bold text-green-400">
                        {team.points}
                    </h3>

                </div>

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">

                <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-zinc-400">Wins</p>

                    <h3 className="text-2xl font-bold text-green-400">
                        {team.won}
                    </h3>
                </div>

                <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-zinc-400">Draws</p>

                    <h3 className="text-2xl font-bold text-yellow-400">
                        {team.draw}
                    </h3>
                </div>

                <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-zinc-400">Losses</p>

                    <h3 className="text-2xl font-bold text-red-400">
                        {team.lost}
                    </h3>
                </div>

                <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-zinc-400">Goal Difference</p>

                    <h3 className="text-2xl font-bold text-blue-400">
                        {team.goalDifference}
                    </h3>
                </div>

                <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-zinc-400">Goals Scored</p>

                    <h3 className="text-2xl font-bold text-green-300">
                        {team.goalsFor}
                    </h3>
                </div>

                <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-zinc-400">Goals Conceded</p>

                    <h3 className="text-2xl font-bold text-red-300">
                        {team.goalsAgainst}
                    </h3>
                </div>

            </div>

            {/* Pie Chart */}
            <div className="mt-10 h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            outerRadius={120}
                            label
                        >

                            <Cell fill="#22c55e" />
                            <Cell fill="#eab308" />
                            <Cell fill="#ef4444" />

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default TeamAnalytics;