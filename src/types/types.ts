import { ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  details: string;
  price: number;
  pic_path: string;
  in_cart: boolean; 
  cart_qty: number;
};


export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};


export type props = {
  children: ReactNode;
};