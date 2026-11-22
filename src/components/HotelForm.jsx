
import { useEffect, useState } from "react";

function HotelForm({ onSubmit, initialData, submitLabel = "Add Hotel" }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  // Load existing hotel details when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);

      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload a hotel image.");
      return;
    }

    onSubmit({
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      price: Number(formData.price),
    });
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
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

      <div className="form-row">
        <div className="form-group">
          <label>Latitude</label>
          <input
            type="number"
            name="latitude"
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
            value={formData.longitude}
            onChange={handleChange}
            min="-180"
            max="180"
            step="any"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <button type="submit" className="submit-hotel-btn">
        {submitLabel}
      </button>
    </form>
  );
}

export default HotelForm;
