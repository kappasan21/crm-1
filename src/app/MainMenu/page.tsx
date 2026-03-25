'use client';
import { useEffect, useState } from "react";
import getProducts from "@/db/getProducts";
import Image from "next/image";
import { UpdateCart } from "./actions";
import type { Product } from "@/types/types";


import { useAuth } from "@/context/auth/useAuth";
import { redirect } from "next/navigation";


export default function MainMenu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  useEffect(() => {
    // Get product list to display on this page
    async function getProductsList() {
      try {
        const response = await getProducts();
        console.log("Products data on Client: ", response);
        setProducts(response);
      } catch (err) {
        console.error("Failed to fetch products data: ", err);
      }
      setLoading(false);
    };
    
    console.log("Current login status: ", isLoggedIn);
    // setIsLoggedIn(true); // move this functionality once update server actions to event handler for login!
    if (!isLoggedIn) {
      return redirect('/Login');
    }
    getProductsList();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) =>
      prev.some(item => item.id === product.id) ? prev : [...prev, product]
    );
    // Optionally: persist cart to localStorage or call backend here
    console.log("Current Cart Items: ", cart); // Delay one step due to state management
    // Need to update the cart Table in DB
    UpdateCart(product.id);
  };


  //JSX
  return (
    <section className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        {loading ? (
          <div className="text-center text-zinc-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="rounded-xl border bg-white shadow-md p-5 flex flex-col items-stretch">
                <Image
                  width={100}
                  height={100}
                  src={`/images/${product.pic_path}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="eager" // Due to recommendation
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-zinc-700 flex-1 mb-2">{product.details}</p>
                <div className="font-bold text-lg mb-4">{product.price}</div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 rounded-md font-medium bg-zinc-900 text-white transition-colors hover:bg-green-500 hover:text-black hover:font-bold"
                >Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
