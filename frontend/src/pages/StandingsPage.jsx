import { useEffect, useState } from "react";
import { getStandings } from "../services/footballService";
import AppShell from "../components/AppShell";
import EmptyState from "../components/EmptyState";
import StandingsTable from "../components/StandingsTable";
import { getLeague } from "../lib/leagues";

function StandingsPage() {
    const [league, setLeague] = useState(localStorage.getItem("league") || "PL");
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const selectedLeague = getLeague(league);

    useEffect(() => {
        let cancelled = false;
        localStorage.setItem("league", league);

        Promise.resolve()
            .then(() => {
                setLoading(true);
                setError("");
                return getStandings(league);
            })
            .then((response) => {
                if (!cancelled) {
                    setStandings(response.data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Could not load standings from the backend.");
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [league]);

    return (
        <AppShell
            league={league}
            setLeague={setLeague}
            eyebrow="Standings"
            title={`${selectedLeague.name} table`}
            description="Compare position, form, goal difference, and points with a cleaner table built for quick scanning."
            meta={[
                { label: "Teams", value: standings.length || "--" },
                { label: "Leader", value: standings[0]?.points ?? "--" }
            ]}
        >
            {loading && (
                <div className="h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
            )}

            {!loading && error && <EmptyState title="Standings unavailable" message={error} />}

            {!loading && !error && <StandingsTable standings={standings} league={league} />}
        </AppShell>
    );
}

export default StandingsPage;
