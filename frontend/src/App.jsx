import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StandingsPage from "./pages/StandingsPage";
import MatchesPage from "./pages/MatchesPage";
import TeamDetails from "./pages/TeamDetails";
import PlayerPage from "./pages/PlayerPage";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/standings"
                    element={<StandingsPage />}
                />

                <Route
                    path="/matches"
                    element={<MatchesPage />}
                />

                <Route 
                    path="/team/:id/:leagueCode" 
                    element={<TeamDetails />} 
                />

                <Route
                    path="/player/:id"
                    element={<PlayerPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;