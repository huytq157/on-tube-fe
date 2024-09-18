import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token:
    (typeof window !== "undefined" && localStorage.getItem("authToken")) ||
    null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
    },

    logOut: (state: AuthState) => {
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// Optional: selectors
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
