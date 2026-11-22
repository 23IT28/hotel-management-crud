import { createSlice } from "@reduxjs/toolkit";
import hotels from "../data/hotels";

const initialState = {
    hotels: hotels
};

const hotelSlice = createSlice({
    name: "hotels",

    initialState,

    reducers: {

        // Add Hotel
        addHotel: (state, action) => {
            state.hotels.push(action.payload);
        },

        // Update Hotel
        updateHotel: (state, action) => {
            const index = state.hotels.findIndex(
                hotel => hotel.id === action.payload.id
            );

            if (index !== -1) {
                state.hotels[index] = action.payload;
            }
        },

        // Delete Hotel
        deleteHotel: (state, action) => {
            state.hotels = state.hotels.filter(
                hotel => hotel.id !== action.payload
            );
        }

    }
});

export const {
    addHotel,
    updateHotel,
    deleteHotel
} = hotelSlice.actions;

export default hotelSlice.reducer;