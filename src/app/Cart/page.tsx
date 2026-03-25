'use client';
import getProducts from "@/db/getProducts";
import { useState, useEffect, } from "react";
import type { Product } from "@/types/types";
import styles from "./page.module.css";




export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [displayList, setDisplayList] = useState<Product[]>([]);
  
  useEffect(() => {
    async function getCartList() {
      const list = await getProducts();
      const sortedList = [...list].sort((a, b) => a.id - b.id);
      console.log("Sorted List: ", sortedList);
      const result = list.filter((item) => item.in_cart === true);
      const sortedResult = [...result].sort((a, b) => (a.id - b.id));
      console.log("Items in cart in getProducts(): ", result);
      setDisplayList(sortedResult);
      // setCartItems(list);
      setCartItems(sortedList);
    }

    getCartList();
    console.log("Current Cart: ", cartItems);
  }, []);

  // JSX
  return (
    <div className={styles.mainContainer}>
      <h2>Cart Items</h2>
      <ol>
        {cartItems.map((item: Product, idx: number) => (
          <li key={idx}>
            <p>{item.id}: {item.name} - {item.price} - x{item.cart_qty}</p>
          </li>
        ))}
      </ol>

      <h2>Cart Item2</h2>
      <ul>
        {displayList.map((item: Product, idx: number) => (
          <li key={idx}>
            <p>{item.id}: {item.name} - {item.cart_qty} - {String(item.in_cart)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};



