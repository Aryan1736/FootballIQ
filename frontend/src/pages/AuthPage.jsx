import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AuthPage({ mode }) {
    const isRegister = mode === "register";
    const navigate = useNavigate();
    const { login, register, isAuthenticated } = useAuth();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (event) => {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (isRegister) {
                await register(form);
            } else {
                await login({
                    email: form.email,
                    password: form.password
                });
            }

            navigate("/", { replace: true });
        } catch (requestError) {
            setError(
                requestError.response?.data?.message
                || requestError.response?.data?.error
                || "Authentication failed. Check your details and try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050608] text-white">
            <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 px-4 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
                <section className="hidden lg:block">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-lg font-black text-zinc-950">
                            FQ
                        </span>
                        <span>
                            <span className="block text-xl font-bold">FootballIQ</span>
                            <span className="text-sm text-zinc-500">
                                Personalized football intelligence
                            </span>
                        </span>
                    </Link>

                    <div className="mt-16">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                            Your club room
                        </p>
                        <h1 className="mt-4 text-5xl font-black tracking-tight">
                            Build a dashboard around the teams and players you follow.
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
                            Sign in to save favorites, personalize matchday views, and unlock the next layer of FootballIQ.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                                Coming next
                            </p>
                            <p className="mt-2 text-2xl font-black">Favorites</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                                Later
                            </p>
                            <p className="mt-2 text-2xl font-black">AI insights</p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30">
                    <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 font-black text-zinc-950">
                            FQ
                        </span>
                        <span className="font-bold">FootballIQ</span>
                    </Link>

                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        {isRegister ? "Create account" : "Welcome back"}
                    </p>
                    <h2 className="mt-2 text-3xl font-black">
                        {isRegister ? "Register for FootballIQ" : "Log in to FootballIQ"}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        {isRegister
                            ? "Create your profile now, then save favorites in the next step."
                            : "Use your account to access your personalized football workspace."}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {isRegister && (
                            <label className="block">
                                <span className="text-sm font-medium text-zinc-300">
                                    Username
                                </span>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300"
                                    placeholder="footballmind"
                                />
                            </label>
                        )}

                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">
                                Email
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">
                                Password
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300"
                                placeholder="Minimum 6 characters"
                            />
                        </label>

                        {error && (
                            <div className="rounded-2xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="h-12 w-full rounded-2xl bg-emerald-300 font-bold text-zinc-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting
                                ? "Please wait..."
                                : isRegister
                                    ? "Create account"
                                    : "Log in"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-400">
                        {isRegister ? "Already have an account?" : "New to FootballIQ?"}{" "}
                        <Link
                            to={isRegister ? "/login" : "/register"}
                            className="font-semibold text-emerald-300 hover:text-emerald-200"
                        >
                            {isRegister ? "Log in" : "Create one"}
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default AuthPage;
