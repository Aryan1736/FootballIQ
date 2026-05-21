import Navbar from "./Navbar";

function AppShell({ children, league, setLeague, eyebrow, title, description, meta }) {
    return (
        <div className="min-h-screen bg-[#050608] text-white">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_28%),linear-gradient(135deg,#050608_0%,#0b1010_55%,#050608_100%)]" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8">
                <Navbar league={league} setLeague={setLeague} />

                {(title || description) && (
                    <header className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            {eyebrow && (
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                    {eyebrow}
                                </p>
                            )}

                            {title && (
                                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                                    {title}
                                </h1>
                            )}

                            {description && (
                                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                                    {description}
                                </p>
                            )}
                        </div>

                        {meta && (
                            <div className="grid min-w-64 grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20">
                                {meta.map((item) => (
                                    <div key={item.label}>
                                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-white">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </header>
                )}

                <main className="pb-12">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppShell;
