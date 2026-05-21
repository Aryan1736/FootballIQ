function EmptyState({ title, message }) {
    return (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
            <p className="text-lg font-semibold text-white">{title}</p>
            {message && (
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                    {message}
                </p>
            )}
        </div>
    );
}

export default EmptyState;
