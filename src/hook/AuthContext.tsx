"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { io, Socket } from "socket.io-client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  data?: any;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logOut: () => void;
  loading: boolean;
  socket: Socket | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: userData, isLoading, error } = useGetMeQuery("");
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
    socket.current = io(socketUrl);
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else if (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(isLoading);
  }, [userData, isLoading, error]);

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        logOut,
        loading,
        socket: socket.current,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
