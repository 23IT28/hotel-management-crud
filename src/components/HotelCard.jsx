function HotelCard({ hotel, onEdit, onDelete }) {

    return (
        <div className="hotel-card">

            <img
                src={hotel.image}
                alt={hotel.title}
                className="hotel-image"
            />

            <div className="hotel-card-content">

                <h3>{hotel.title}</h3>

                <h4>₹{hotel.price}</h4>

                <p>{hotel.description}</p>

                <div className="hotel-card-actions">

                    <button onClick={() => onEdit(hotel.id)}>
                        Edit
                    </button>

                    <button onClick={() => onDelete(hotel.id)}>
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default HotelCard;