'use client';
import { useRouter } from "next/navigation";


export function useLogout () {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // clear local state
    localStorage.clear();

    //Replace history
    router.replace("/Login");
  };

  return logout;
};