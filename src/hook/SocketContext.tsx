"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useUser } from "./AuthContext";
import { Socket } from "socket.io-client";
import { apiSlice } from "@/redux/api/baseApi";
import { useGetNotificationQuery } from "@/redux/api/notificationApi";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket, user, isAuthenticated } = useUser();
  const { data: notifications, refetch } = useGetNotificationQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.emit("new-connection", user);

      socket.on("return-users", (users: any) => {});

      socket.on("new-notification", (notification: any) => {
        if (Notification.permission === "granted") {
          const notify = new Notification(`${notification.from_user?.name}`, {
            body: notification.message,
            icon: "/images/logo-gradient.png",
          });

          notify.onclick = () => {
            // @ts-ignore
            window.location = notification.url;
          };
        }

        apiSlice.util.invalidateTags([{ type: "Notification" }]);
        refetch();
      });
    }

    return () => {
      socket?.off("return-users");
      socket?.off("new-notification");
    };
  }, [isAuthenticated, user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
