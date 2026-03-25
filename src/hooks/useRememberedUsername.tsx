// NOT BEING USED NOW
'use client';
import { useState } from "react";


// Save username in localStorage 
export function useRememberedUsername(key = "rememberedUsername") {
  const [username, setUsername] = useState(
    () => localStorage.getItem(key) || ""
  );

  const save = (value: string) => localStorage.setItem(key, value);
  const remove = () => localStorage.removeItem(key);

  return { username, setUsername, save, remove };
}