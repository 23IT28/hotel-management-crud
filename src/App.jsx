import "./App.css";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import HotelDetails from "./pages/HotelDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HotelList from "./pages/HotelList";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/hotels" replace />} />

                <Route path="/hotels" element={<HotelList />} />

                <Route path="/hotels/add" element={<AddHotel />} />

                <Route path="/hotels/edit/:id" element={<EditHotel />} />

                <Route path="/hotels/:id" element={<HotelDetails />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;