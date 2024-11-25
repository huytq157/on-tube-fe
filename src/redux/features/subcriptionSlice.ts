// src/redux/features/subscriptionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  subscriptionStatus: Record<string, boolean>;
  subscribersCount: Record<string, number>;
  loading: boolean;
}

const initialState: SubscriptionState = {
  subscriptionStatus: {},
  subscribersCount: {},
  loading: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionStatus: (
      state,
      action: PayloadAction<{ channelId: string; subscribed: boolean }>
    ) => {
      state.subscriptionStatus[action.payload.channelId] =
        action.payload.subscribed;
    },
    setSubscribersCount: (
      state,
      action: PayloadAction<{ channelId: string; count: number }>
    ) => {
      state.subscribersCount[action.payload.channelId] = action.payload.count;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSubscriptionStatus, setSubscribersCount, setLoading } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
