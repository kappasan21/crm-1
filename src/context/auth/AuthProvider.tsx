'use client';

import { useState, ReactNode, } from "react";
import { AuthContext } from "./AuthContext";



export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");

  return (
    <AuthContext.Provider value={({ isLoggedIn, setIsLoggedIn })}>
      { children }
    </AuthContext.Provider>
  );
};