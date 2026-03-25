'use client';


import { useContext } from "react";
import { AuthContext } from "./AuthContext";

import { AuthContextType } from "./AuthContext";

export function useAuth() {
  const context = useContext<AuthContextType | null>(AuthContext);
  if(!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};