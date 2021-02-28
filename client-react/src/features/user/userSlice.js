import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;

export const selectToken = (state) => state.user.token;
