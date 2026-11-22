
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";
import { deleteHotel } from "../redux/hotelSlice";

function HotelList() {
  const hotels = useSelector((state) => state.hotels.hotels);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Delete popup states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  // Search handlers
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

  // Edit hotel
  const handleEdit = (id) => {
    navigate(`/hotels/edit/${id}`);
  };

  // Open delete confirmation popup
  const handleDelete = (id) => {
    setSelectedHotelId(id);
    setShowDeleteModal(true);
  };

  // Confirm hotel deletion
  const confirmDelete = () => {
    const remainingHotels = filteredHotels.filter(
      (hotel) => hotel.id !== selectedHotelId
    );

    const newTotalPages = Math.ceil(
      remainingHotels.length / itemsPerPage
    );

    dispatch(deleteHotel(selectedHotelId));

    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }

    setShowDeleteModal(false);
    setSelectedHotelId(null);
    setSuccessMessage("Hotel deleted successfully!");
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedHotelId(null);
  };

  return (
    <div className="hotel-list-page">
      <Navbar />

      <div className="hotel-list-container">
        <h1>Our Hotels</h1>
        <p>Explore our available hotels</p>

        {/* Search and Price Filters */}
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

        {/* Hotel Cards */}
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

        {/* Delete Confirmation Popup */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="confirmation-modal">
              <h2>Delete Hotel?</h2>

              <p>
                Are you sure you want to delete this hotel?
                This action cannot be undone.
              </p>

              <div className="modal-actions">
                <button
                  onClick={cancelDelete}
                  className="cancel-btn"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="confirm-delete-btn"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <span>{successMessage}</span>

            <button onClick={() => setSuccessMessage("")}>
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelList;
