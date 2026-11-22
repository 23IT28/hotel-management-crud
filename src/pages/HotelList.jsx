
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";

function HotelList() {
  const hotels = useSelector((state) => state.hotels.hotels);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMinPrice =
      minPrice === "" || hotel.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || hotel.price <= Number(maxPrice);

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

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

        <div className="hotel-filters">
          <input
            type="text"
            placeholder="Search hotels by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="hotel-grid">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="no-hotels">No hotels found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelList;
