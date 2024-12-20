"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useUser } from "./AuthContext";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket, user, isAuthenticated } = useUser();

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.emit("new-connection", user);

      socket.on("return-users", (users: any) => {});

      socket.on("new-notification", (notification: any) => {});
    }

    return () => {
      socket?.off("return-users");
      socket?.off("new-notification");
    };
  }, [isAuthenticated, socket, user]);

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
