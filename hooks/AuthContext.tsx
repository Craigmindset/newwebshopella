"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const session = localStorage.getItem("shopella_user");
    if (session) {
      setUser(JSON.parse(session));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  function login(userData: User) {
    setUser(userData);
    localStorage.setItem("shopella_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("shopella_user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
