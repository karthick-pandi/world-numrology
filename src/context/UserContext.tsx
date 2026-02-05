"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  email: string;
  name?: string;
  token?: string;
  [key: string]: any;
}

interface UserContextType {
  userResponse: User | null;
  setUserResponse: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userResponse, setUserResponse] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage if available
    const stored = localStorage.getItem("user");
    if (stored) setUserResponse(JSON.parse(stored));
  }, []);

  const saveUser = (user: User | null) => {
    setUserResponse(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    saveUser(null);
  };

  return (
    <UserContext.Provider value={{ userResponse, setUserResponse: saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
