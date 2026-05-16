function DashboardSkeleton() {

    return (

        <div className="min-h-screen bg-black text-white p-8 ">

            {/* Navbar */}
            <div className="flex justify-between items-center mb-10">

                <div className="h-10 w-48 bg-zinc-800 rounded"></div>

                <div className="h-10 w-40 bg-zinc-800 rounded"></div>

            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Standings */}
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <div className="h-8 w-48 bg-zinc-800 rounded mb-6"></div>

                    <div className="space-y-4">

                        {[...Array(5)].map((_, index) => (

                            <div
                                key={index}
                                className="h-16 bg-zinc-800 rounded-xl"
                            ></div>

                        ))}

                    </div>

                </div>

                {/* Matches */}
                <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

                    <div className="h-8 w-48 bg-zinc-800 rounded mb-6"></div>

                    <div className="space-y-4">

                        {[...Array(3)].map((_, index) => (

                            <div
                                key={index}
                                className="h-32 bg-zinc-800 rounded-xl"
                            ></div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DashboardSkeleton;