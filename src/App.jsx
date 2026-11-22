import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HotelList from "./pages/HotelList";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/hotels" replace />}
                />

                <Route
                    path="/hotels"
                    element={<HotelList />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;