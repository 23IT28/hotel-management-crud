import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelSlice";
import hotels from "../data/hotels";

// Load saved data from localStorage
const savedHotels = localStorage.getItem("hotels");

const preloadedState = {
    hotels: {
        hotels: savedHotels
            ? JSON.parse(savedHotels)
            : hotels
    }
};

// Create Redux Store
export const store = configureStore({
    reducer: {
        hotels: hotelReducer
    },
    preloadedState
});

// Save updated data to localStorage
store.subscribe(() => {
    const state = store.getState();

    localStorage.setItem(
        "hotels",
        JSON.stringify(state.hotels.hotels)
    );
});