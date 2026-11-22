import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";

function HotelList() {

    const hotels = useSelector(
        state => state.hotels.hotels
    );

    const handleEdit = (id) => {
        console.log("Edit Hotel ID:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete Hotel ID:", id);
    };

    return (
        <div className="hotel-list-page">

            <Navbar />

            <div className="hotel-list-container">

                <h1>Our Hotels</h1>

                <p>Explore our available hotels</p>

                <div className="hotel-grid">

                    {hotels.map((hotel) => (
                        <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
}

export default HotelList;