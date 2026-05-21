import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import EmptyState from "./EmptyState";

function TeamAnalytics({ team }) {
    if (!team) {
        return (
            <EmptyState
                title="Analytics unavailable"
                message="This team could not be matched to the selected league table."
            />
        );
    }

    const chartData = [
        { name: "Wins", value: team.won, color: "#34d399" },
        { name: "Draws", value: team.draw, color: "#fbbf24" },
        { name: "Losses", value: team.lost, color: "#fb7185" }
    ];

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Performance
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-white">
                        Team Analytics
                    </h2>
                </div>

                <div className="rounded-2xl bg-emerald-300 px-5 py-3 text-zinc-950">
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                        Points
                    </p>
                    <p className="text-3xl font-black">{team.points}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {[
                    ["Wins", team.won, "text-emerald-300"],
                    ["Draws", team.draw, "text-amber-300"],
                    ["Losses", team.lost, "text-rose-300"],
                    ["Goal difference", team.goalDifference, "text-sky-300"],
                    ["Goals scored", team.goalsFor, "text-emerald-200"],
                    ["Goals conceded", team.goalsAgainst, "text-rose-200"]
                ].map(([label, value, tone]) => (
                    <div key={label} className="rounded-2xl bg-zinc-950/50 p-4">
                        <p className="text-sm text-zinc-500">{label}</p>
                        <p className={`mt-2 text-2xl font-black ${tone}`}>
                            {value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={chartData} dataKey="value" innerRadius={70} outerRadius={105}>
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: "#09090b",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "16px",
                                color: "#fff"
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}

export default TeamAnalytics;
