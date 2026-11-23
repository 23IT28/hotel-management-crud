const hotels = [
  {
    id: 1,
    title: "Grand Palace",
    description: "Luxury hotel with premium rooms and facilities.",
    latitude: 11.0168,
    longitude: 76.9558,
    price: 3500,
    image: "/images/grand-palace.jpg",

    rooms: {
      single: {
        image: "/images/rooms/grand-single.jpg",
        price: 1800,
      },
      double: {
        image: "/images/rooms/grand-double.jpg",
        price: 2800,
      },
    },
  },

  {
    id: 2,
    title: "Ocean View",
    description: "Beautiful hotel with comfortable rooms.",
    latitude: 13.0827,
    longitude: 80.2707,
    price: 4500,
    image: "/images/ocean-view.jpg",

    rooms: {
      single: {
        image: "/images/rooms/ocean-single.jpg",
        price: 2200,
      },
      double: {
        image: "/images/rooms/ocean-double.jpg",
        price: 3500,
      },
    },
  },

  {
    id: 3,
    title: "Green Valley",
    description: "Peaceful hotel surrounded by greenery.",
    latitude: 10.7905,
    longitude: 78.7047,
    price: 2800,
    image: "/images/green-valley.jpg",

    rooms: {
      single: {
        image: "/images/rooms/green-single.jpg",
        price: 1500,
      },
      double: {
        image: "/images/rooms/green-double.jpg",
        price: 2400,
      },
    },
  },
];

export default hotels;
