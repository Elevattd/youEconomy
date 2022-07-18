import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  authFetched: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = { ...state.user, ...user };
      state.token = accessToken || state.token;
      state.authFetched = true;
    },
    logOut: () => ({
      user: null,
      token: null,
      authFetched: false,
    }),
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAuthFetched = (state) => state.auth.authFetched;

export default authSlice.reducer;
