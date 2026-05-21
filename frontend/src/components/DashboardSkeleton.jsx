import AppShell from "./AppShell";

function DashboardSkeleton({ league, setLeague }) {
    return (
        <AppShell
            league={league}
            setLeague={setLeague}
            eyebrow="Loading"
            title="Preparing matchday data"
            description="Fetching standings, fixtures, results, and player leaders."
        >
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                            />
                        ))}
                    </div>

                    <div className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                    <div className="h-80 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                </div>

                <div className="space-y-6">
                    <div className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                    <div className="h-80 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                </div>
            </div>
        </AppShell>
    );
}

export default DashboardSkeleton;
