import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function FavoriteButton({ active, disabled, label, onClick }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Link
                to="/login"
                className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
                Login to save
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`rounded-full px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                active
                    ? "bg-emerald-300 text-zinc-950 hover:bg-emerald-200"
                    : "border border-white/10 bg-white/[0.06] text-white hover:bg-white/10"
            }`}
        >
            {active ? "Saved" : label}
        </button>
    );
}

export default FavoriteButton;
