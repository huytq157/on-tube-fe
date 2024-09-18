// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthState {
//   userInfo: UserInfo | null;
// }

// const initialState: AuthState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo") as string)
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state: AuthState, action: PayloadAction<UserInfo>) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo", JSON.stringify(action.payload));

//       const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
//       localStorage.setItem("expirationTime", expirationTime.toString());
//     },

//     logOut: (state: AuthState) => {
//       state.userInfo = null;
//       localStorage.clear();
//     },
//   },
// });

// export const { setCredentials, logOut } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken") || null,
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
