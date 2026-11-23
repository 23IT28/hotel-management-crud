function RoomTypes({ rooms }) {
  const roomList = [
    {
      id: "single",
      name: "Single Bed Room",
      bed: "1 Single Bed",
      guests: "1 Guest",
      description:
        "A cozy and comfortable room, ideal for solo travellers.",
    },
    {
      id: "double",
      name: "Twin Bed Room",
      bed: "2 Single Beds",
      guests: "2 Guests",
      description:
        "A spacious and comfortable room featuring two separate beds, ideal for friends or family.",
    },
  ];

  if (!rooms?.single?.image || !rooms?.double?.image) {
    return (
      <section className="room-types-section">
        <div className="room-section-heading">
          <span>COMFORTABLE STAYS</span>
          <h2>Available Room Types</h2>
        </div>
        <p>Room details are not available for this hotel yet.</p>
      </section>
    );
  }

  return (
    <section className="room-types-section">
      <div className="room-section-heading">
        <span>COMFORTABLE STAYS</span>
        <h2>Available Room Types</h2>
        <p>
          Explore the room options available at this hotel.
        </p>
      </div>

      <div className="room-types-grid">
        {roomList.map((room) => {
          const roomData = rooms[room.id];

          return (
            <article className="room-card" key={room.id}>
              <img
                src={roomData.image}
                alt={room.name}
                className="room-card-image"
              />

              <div className="room-card-content">
                <h3>{room.name}</h3>

                <div className="room-info">
                  <span>{room.bed}</span>
                  <span>{room.guests}</span>
                </div>

                <p>{room.description}</p>

                <div className="room-price">
                  <strong>
                    ₹{Number(roomData.price).toLocaleString("en-IN")}
                  </strong>
                  <span>/ night</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RoomTypes;
