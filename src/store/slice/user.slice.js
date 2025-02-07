import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
  token: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : null,
};

const userSlice = createSlice({
  name: "inforUser",
  initialState,
  reducers: {
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleUpdateToken: (state, action) => {
      state.token = action.payload;
    },
    handleDeleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { handleUpdateUser, handleDeleteUser, handleUpdateToken } =
  userSlice.actions;

export default userSlice.reducer;
