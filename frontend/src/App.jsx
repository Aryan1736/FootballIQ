import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StandingsPage from "./pages/StandingsPage";
import MatchesPage from "./pages/MatchesPage";
import TeamDetails from "./pages/TeamDetails";
import PlayerPage from "./pages/PlayerPage";
import AuthPage from "./pages/AuthPage";
import AuthProvider from "./context/AuthProvider";


function App() {

    return (

        <BrowserRouter>
            <AuthProvider>

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

                <Route
                    path="/login"
                    element={<AuthPage mode="login" />}
                />

                <Route
                    path="/register"
                    element={<AuthPage mode="register" />}
                />

            </Routes>
            </AuthProvider>

        </BrowserRouter>
    );
}

export default App;
