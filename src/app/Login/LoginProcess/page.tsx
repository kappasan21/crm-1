'use client';
import { useAuth } from "@/context/auth/useAuth";
import { redirect } from "next/navigation";


import { useEffect } from "react";


export default function LoginProcessPage() {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  useEffect(() => {
  setIsLoggedIn(true);
  redirect('/MainMenu');
  },[isLoggedIn, setIsLoggedIn]);



  return <>Processing...</>;
};