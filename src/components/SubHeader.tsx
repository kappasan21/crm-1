'use client';
import styles from './SubHeader.module.css';
import Link from 'next/link';

import { useState, useEffect, } from 'react';
import { getDataInToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth/useAuth';

export type TokenData = {
  email: string;
};


export default function SubHeader() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  useEffect(() => {
    // Check JWT and if not, move back to Login page
    

    async function getLoginUser() {
      const data = await getDataInToken() as TokenData;
      if (!data) {
        setCurrentEmail(null);
        return;
      }
      console.log("JWT data in SubHeader: ", data);
      setCurrentEmail(data.email);
    };

    getLoginUser();
    console.log("Current User: ", currentEmail);
  },[isLoggedIn, currentEmail]);


  const router = useRouter();
  async function handleLogoutClick() {
    console.log("Clicked logout button!");
    const result = await fetch('/api/auth/logout', {
      method: "POST",
      credentials: "include",
    });
    if (!result.ok) {
      console.error("Failed to logout");
    }
    setIsLoggedIn(false);
    console.log("Logout normally.");
    // Use replace so the protected page is removed from history
    router.replace('/Login');
    // Force a refresh to clear the Next.js Data Cache
    router.refresh();
  };

  // JSX
  return (
    <div id="subHeader" className={styles.mainContainer}>
        {!isLoggedIn  ? "" : <>
        <ol className={styles.listContainer}>
          <li>
            <Link  className="block w-30 py-1 rounded-md text-center border-1 hover:bg-orange-400" href="./MainMenu">Products List</Link>
          </li>
          <li>
            <Link  className="block w-30 py-1 rounded-md text-center border-1 rounded-md hover:bg-orange-400" href="/Cart">Cart</Link>
          </li>
        </ol>

        <ul className="flex flex-row justify-between items-center gap-5">
          <li>
            <p className="min-w-30"><span className="font-bold">USER: </span> {currentEmail}</p>
          </li>
          <li>
            
            <button
              className="w-30 py-1 rounded-md hover:bg-orange-400"
              onClick={handleLogoutClick}
            >Logout</button>
          </li>
        </ul>
      </>}
    </div>
  );
};

