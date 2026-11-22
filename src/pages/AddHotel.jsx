
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHotel } from "../redux/hotelSlice";
import Navbar from "../components/Navbar";
import HotelForm from "../components/HotelForm";

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

      <div className="form-page-container">
        <h1>Add New Hotel</h1>
        <p>Enter the hotel details below</p>

        <HotelForm onSubmit={handleAddHotel} />
      </div>
    </div>
  );
}

export default AddHotel;
