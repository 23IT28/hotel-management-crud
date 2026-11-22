
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";

function HotelList() {
  const hotels = useSelector((state) => state.hotels.hotels);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Search and price filter
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

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredHotels.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filters change
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleMinPrice = (value) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPrice = (value) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  // Navigate to Edit Hotel page
  const handleEdit = (id) => {
    navigate(`/hotels/edit/${id}`);
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
            onChange={(e) => handleSearch(e.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum price"
            value={minPrice}
            onChange={(e) => handleMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum price"
            value={maxPrice}
            onChange={(e) => handleMaxPrice(e.target.value)}
          />
        </div>

        <div className="hotel-grid">
          {currentHotels.length > 0 ? (
            currentHotels.map((hotel) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={
                  currentPage === page ? "active-page" : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelList;
