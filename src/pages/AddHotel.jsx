import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHotel } from "../redux/hotelSlice";
import Navbar from "../components/Navbar";
import HotelForm from "../components/HotelForm";
import { Helmet } from "react-helmet-async";

function AddHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddHotel = (hotelData) => {
    const newHotel = {
      id: Date.now(),
      ...hotelData,
    };

    dispatch(addHotel(newHotel));
    navigate("/hotels");
  };

  return (
    <div className="hotel-list-page">
      <Navbar />
        <Helmet>
            <title>Add Hotel | Add New Hotel</title>
            <meta
                name="description"
                content="Add a new hotel to StayComfo. Fill in the details and submit to list your hotel."
            />
        </Helmet>
      <div className="form-page-container">
        <h1>Add New Hotel</h1>
        <p>Enter the hotel details below</p>

        <HotelForm onSubmit={handleAddHotel} />
      </div>
    </div>
  );
}

export default AddHotel;
