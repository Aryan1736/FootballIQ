import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StandingsPage from "./pages/StandingsPage";
import MatchesPage from "./pages/MatchesPage";

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

            </Routes>

        </BrowserRouter>
    );
}

export default App;