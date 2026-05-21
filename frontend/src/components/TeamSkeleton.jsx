function TeamSkeleton() {
    return (
        <div className="min-h-screen bg-[#050608] p-6 text-white">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="h-56 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-6">
                        <div className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                        <div className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                    </div>
                    <div className="space-y-6">
                        <div className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                        <div className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSkeleton;
