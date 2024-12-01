import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  // token:
  //   (typeof window !== "undefined" && localStorage.getItem("authToken")) ||
  //   null,
  token: Cookies.get("token") || null,
};

let socket: Socket | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      // localStorage.setItem("authToken", action.payload);
      Cookies.set("token", action.payload, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
      }); // Lưu token vào cookie

      if (!socket) {
        socket = io("http://localhost:5000/", {
          auth: {
            token: action.payload,
          },
        });

        socket.on("connect", () => {
          console.log("Socket connected, ID:", socket?.id);
        });
      }
    },

    logOut: (state: AuthState) => {
      state.token = null;
      // localStorage.removeItem("authToken");
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
