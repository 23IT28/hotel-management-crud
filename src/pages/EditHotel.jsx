
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateHotel } from "../redux/hotelSlice";
import Navbar from "../components/Navbar";
import HotelForm from "../components/HotelForm";

function EditHotel() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotel = useSelector((state) =>
    state.hotels.hotels.find(
      (item) => item.id === Number(id)
    )
  );

  const handleUpdateHotel = (hotelData) => {
    const updatedHotel = {
      ...hotel,
      ...hotelData,
    };

    dispatch(updateHotel(updatedHotel));
    navigate("/hotels");
  };

  if (!hotel) {
    return (
      <>
        <Navbar />
        <div className="form-page-container">
          <h2>Hotel not found</h2>
        </div>
      </>
    );
  }

  return (
    <div className="hotel-list-page">
      <Navbar />

      <div className="form-page-container">
        <h1>Edit Hotel</h1>
        <p>Update the hotel details below</p>

        <HotelForm
          initialData={hotel}
          onSubmit={handleUpdateHotel}
          submitLabel="Update Hotel"
        />
      </div>
    </div>
  );
}

export default EditHotel;
