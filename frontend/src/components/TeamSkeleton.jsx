function TeamSkeleton() {

    return (

        <div className="min-h-screen bg-black text-white p-6 ">

            {/* Header */}
            <div className="bg-zinc-900 rounded-3xl p-6 flex items-center gap-6">

                <div className="w-28 h-28 bg-zinc-800 rounded-full"></div>

                <div className="space-y-4">

                    <div className="h-8 w-64 bg-zinc-800 rounded"></div>

                    <div className="h-4 w-48 bg-zinc-800 rounded"></div>

                    <div className="h-4 w-40 bg-zinc-800 rounded"></div>

                    <div className="h-4 w-52 bg-zinc-800 rounded"></div>

                </div>

            </div>

            {/* Analytics */}
            <div className="mt-8 grid grid-cols-2 gap-4">

                {[...Array(6)].map((_, index) => (

                    <div
                        key={index}
                        className="bg-zinc-900 h-28 rounded-2xl"
                    ></div>

                ))}

            </div>

            {/* Squad */}
            <div className="mt-8 bg-zinc-900 rounded-3xl p-6">

                <div className="h-8 w-40 bg-zinc-800 rounded mb-6"></div>

                <div className="space-y-4">

                    {[...Array(8)].map((_, index) => (

                        <div
                            key={index}
                            className="h-10 bg-zinc-800 rounded"
                        ></div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default TeamSkeleton;