import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
};

let socket: Socket | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
      });
    },

    logOut: (state: AuthState) => {
      state.token = null;
      Cookies.remove("token");

      if (socket) {
        socket.disconnect();
        socket = null;
      }
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// Optional: selectors
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
