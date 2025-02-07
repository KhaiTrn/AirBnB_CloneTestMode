import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("favoriteRooms")
  ? JSON.parse(localStorage.getItem("favoriteRooms"))
  : [];

const favoriteRoomsSlice = createSlice({
  name: "favoriteRooms",
  initialState,
  reducers: {
    addFavoriteRoom: (state, action) => {
      const room = action.payload;
      if (!state.find((item) => item.id === room.id)) {
        state.push(room);
        localStorage.setItem("favoriteRooms", JSON.stringify(state));
      }
    },
    removeFavoriteRoom: (state, action) => {
      const roomId = action.payload;
      const index = state.findIndex((room) => room.id === roomId);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("favoriteRooms", JSON.stringify(state));
    },
  },
});

export const { addFavoriteRoom, removeFavoriteRoom } =
  favoriteRoomsSlice.actions;

export default favoriteRoomsSlice.reducer;
