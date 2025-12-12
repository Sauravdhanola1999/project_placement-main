'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = Cookies.get("token");
    if (t) setUser({ token: t });
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/signin-admin", { email, password });

    // ✔ Correct extraction based on your real backend JSON
    const token = res.data?.data?.token;
    const user = res.data?.data?.user;

    if (!token) {
      console.error("Response received:", res.data);
      throw new Error("No token in response");
    }

    // ✔ Save token in cookies
    Cookies.set("token", token, { expires: 1 });
    setUser({ token, user });

    return res;
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
