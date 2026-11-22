
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = useSelector((state) =>
    state.hotels.hotels.find(
      (item) => item.id === Number(id)
    )
  );

  if (!hotel) {
    return (
      <>
        <Navbar />
        <div className="details-container">
          <h2>Hotel not found</h2>
          <button onClick={() => navigate("/hotels")}>
            Back to Hotels
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="hotel-list-page">
      <Navbar />

      <div className="details-container">
        <button
          className="back-btn"
          onClick={() => navigate("/hotels")}
        >
          ← Back to Hotels
        </button>

        <div className="hotel-details-card">
          <img
            src={hotel.image}
            alt={hotel.title}
            className="details-image"
          />

          <div className="details-content">
            <h1>{hotel.title}</h1>

            <h2>₹{hotel.price}</h2>

            <p>{hotel.description}</p>

            <div className="coordinates">
              <p>
                <strong>Latitude:</strong> {hotel.latitude}
              </p>

              <p>
                <strong>Longitude:</strong> {hotel.longitude}
              </p>
            </div>
          </div>
        </div>

        <div className="map-section">
          <h2>Hotel Location</h2>

          <MapContainer
            center={[Number(hotel.latitude), Number(hotel.longitude)]}
            zoom={13}
            scrollWheelZoom={true}
            className="hotel-map"
            key={hotel.id}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <CircleMarker
              center={[
                Number(hotel.latitude),
                Number(hotel.longitude),
              ]}
              radius={10}
              pathOptions={{
                color: "#2563eb",
                fillColor: "#3b82f6",
                fillOpacity: 0.8,
              }}
            >
              <Popup>{hotel.title}</Popup>
            </CircleMarker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
