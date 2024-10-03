"use client";

// import useSyncLogoutAcrossTabs from "@/hook/useSyncLogoutAcrossTabs";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const ReduxProviderClient = ({ children }: { children: React.ReactNode }) => {
  // useSyncLogoutAcrossTabs();
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviderClient;
