import { useEffect, useState } from "react";

const createEmptyRooms = () => ({
  single: {
    image: "",
    price: "",
  },
  double: {
    image: "",
    price: "",
  },
});

function HotelForm({
  onSubmit,
  initialData,
  submitLabel = "Add Hotel",
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: "",
    rooms: createEmptyRooms(),
  });

  const [imagePreview, setImagePreview] = useState("");

  const [roomPreviews, setRoomPreviews] = useState({
    single: "",
    double: "",
  });

  // Load existing hotel details while editing
  useEffect(() => {
    if (initialData) {
      const existingRooms = initialData.rooms || {};

      setFormData({
        ...initialData,
        latitude: String(initialData.latitude ?? ""),
        longitude: String(initialData.longitude ?? ""),
        price: String(initialData.price ?? ""),
        rooms: {
          single: {
            image: existingRooms.single?.image || "",
            price: String(existingRooms.single?.price ?? ""),
          },
          double: {
            image: existingRooms.double?.image || "",
            price: String(existingRooms.double?.price ?? ""),
          },
        },
      });

      setImagePreview(initialData.image || "");

      setRoomPreviews({
        single: existingRooms.single?.image || "",
        double: existingRooms.double?.image || "",
      });
    }
  }, [initialData]);

  // Handle normal input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate image and convert it to Base64
  const readImage = (file, callback, input) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      input.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      input.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Handle hotel image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    readImage(
      file,
      (image) => {
        setImagePreview(image);

        setFormData((prev) => ({
          ...prev,
          image,
        }));
      },
      e.target
    );
  };

  // Handle room image upload
  const handleRoomImageChange = (e, roomType) => {
    const file = e.target.files[0];

    readImage(
      file,
      (image) => {
        setRoomPreviews((prev) => ({
          ...prev,
          [roomType]: image,
        }));

        setFormData((prev) => ({
          ...prev,
          rooms: {
            ...prev.rooms,
            [roomType]: {
              ...prev.rooms[roomType],
              image,
            },
          },
        }));
      },
      e.target
    );
  };

  // Handle room price changes
  const handleRoomPriceChange = (e, roomType) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: {
          ...prev.rooms[roomType],
          price: value,
        },
      },
    }));
  };

  // Validate all form fields
  const validateForm = () => {
    if (formData.title.trim().length < 3) {
      alert("Hotel title must contain at least 3 characters.");
      return false;
    }

    if (formData.description.trim().length < 10) {
      alert("Description must contain at least 10 characters.");
      return false;
    }

    if (
      formData.latitude === "" ||
      !Number.isFinite(Number(formData.latitude)) ||
      Number(formData.latitude) < -90 ||
      Number(formData.latitude) > 90
    ) {
      alert("Latitude must be between -90 and 90.");
      return false;
    }

    if (
      formData.longitude === "" ||
      !Number.isFinite(Number(formData.longitude)) ||
      Number(formData.longitude) < -180 ||
      Number(formData.longitude) > 180
    ) {
      alert("Longitude must be between -180 and 180.");
      return false;
    }

    if (
      formData.price === "" ||
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      alert("Hotel price must be greater than zero.");
      return false;
    }

    if (!formData.image) {
      alert("Please upload a hotel image.");
      return false;
    }

    // Validate single and twin room details
    for (const roomType of ["single", "double"]) {
      const room = formData.rooms[roomType];

      if (!room.image) {
        alert(
          `Please upload the ${
            roomType === "single" ? "single" : "twin"
          } room image.`
        );
        return false;
      }

      if (
        room.price === "" ||
        !Number.isFinite(Number(room.price)) ||
        Number(room.price) <= 0
      ) {
        alert(
          `${
            roomType === "single" ? "Single" : "Twin"
          } room price must be greater than zero.`
        );
        return false;
      }
    }

    return true;
  };

  // Submit hotel and room details
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      price: Number(formData.price),
      rooms: {
        single: {
          image: formData.rooms.single.image,
          price: Number(formData.rooms.single.price),
        },
        double: {
          image: formData.rooms.double.image,
          price: Number(formData.rooms.double.price),
        },
      },
    });
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>

      {/* Hotel Image */}
      <div className="form-group">
        <label>Hotel Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!formData.image}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Hotel preview"
            className="image-preview"
          />
        )}
      </div>

      {/* Hotel Title */}
      <div className="form-group">
        <label>Hotel Title</label>

        <input
          type="text"
          name="title"
          placeholder="Enter hotel name"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          placeholder="Enter hotel description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={10}
          rows="4"
        />
      </div>

      {/* Latitude and Longitude */}
      <div className="form-row">
        <div className="form-group">
          <label>Latitude</label>

          <input
            type="number"
            name="latitude"
            placeholder="Example: 11.0168"
            value={formData.latitude}
            onChange={handleChange}
            min="-90"
            max="90"
            step="any"
            required
          />
        </div>

        <div className="form-group">
          <label>Longitude</label>

          <input
            type="number"
            name="longitude"
            placeholder="Example: 76.9558"
            value={formData.longitude}
            onChange={handleChange}
            min="-180"
            max="180"
            step="any"
            required
          />
        </div>
      </div>

      {/* Hotel Price */}
      <div className="form-group">
        <label>Hotel Price (₹)</label>

        <input
          type="number"
          name="price"
          placeholder="Enter hotel price"
          value={formData.price}
          onChange={handleChange}
          min="0.01"
          step="any"
          required
        />
      </div>

      {/* Room Details */}
      <div className="room-form-section">
        <h2>Room Details</h2>

        <p>
          Upload room images and enter individual prices for this hotel.
        </p>

        {/* Single Bed Room */}
        <div className="room-form-card">
          <h3>Single Bed Room</h3>

          <p>1 Single Bed · 1 Guest</p>

          <div className="form-group">
            <label>Single Room Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleRoomImageChange(e, "single")
              }
              required={!formData.rooms.single.image}
            />

            {roomPreviews.single && (
              <img
                src={roomPreviews.single}
                alt="Single room preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label>Single Room Price (₹ / night)</label>

            <input
              type="number"
              placeholder="Enter single room price"
              value={formData.rooms.single.price}
              onChange={(e) =>
                handleRoomPriceChange(e, "single")
              }
              min="0.01"
              step="any"
              required
            />
          </div>
        </div>

        {/* Twin Bed Room */}
        <div className="room-form-card">
          <h3>Twin Bed Room</h3>

          <p>2 Single Beds · 2 Guests</p>

          <div className="form-group">
            <label>Twin Room Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleRoomImageChange(e, "double")
              }
              required={!formData.rooms.double.image}
            />

            {roomPreviews.double && (
              <img
                src={roomPreviews.double}
                alt="Twin room preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label>Twin Room Price (₹ / night)</label>

            <input
              type="number"
              placeholder="Enter twin room price"
              value={formData.rooms.double.price}
              onChange={(e) =>
                handleRoomPriceChange(e, "double")
              }
              min="0.01"
              step="any"
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" className="submit-hotel-btn">
        {submitLabel}
      </button>

    </form>
  );
}

export default HotelForm;
