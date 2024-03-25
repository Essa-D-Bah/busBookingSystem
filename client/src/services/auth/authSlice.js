import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user:null },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user} = action.payload;
      state.token = token;
      state.user = user;
    },

    logOut: (state, action) => {
      state.token = null;
      state.user =null
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentAccessToken = (state) => state.auth.token;
