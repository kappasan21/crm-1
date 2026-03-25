// Not USED NOW
'use client';

import { useEffect } from "react";
// Be careful!!! There are two "useRouter"!!!
import { useRouter } from "next/navigation"; 
import { props } from "@/types/types";



export default function AuthChecker({children}: props) {
  const router = useRouter();

  useEffect(() => {
    async function checkToken() {
      try {
        const res = await fetch("/api/auth/validate", {
          method: "GET",
          credentials: "include", // lax
        });

        if (!res.ok) {
          console.log("Failed token validation.");
          router.push("Login");
        }
      } catch (err) {
        console.error("Error while token validation: ", err);
        router.push("/Login");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);

  // JSX
  return (
    <>{children}</>
  )
};