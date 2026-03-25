'use server';
import { pool } from "@/db/db";
import { NextResponse } from 'next/server';
import type { Product } from "@/types/types";




export async function GET() {
  try {
  const result = await pool.query("SELECT * FROM products");
  if(result.rows.length === 0) {
    console.log("No products found in DB");
    return NextResponse.json(
      { data: []},
      {status: 401}
    );
  }
  return NextResponse.json(
    { data: result.rows},
    { status: 200 }
  );
  } catch (err) {
    console.error("Error while accessing DB: ", err);
    return NextResponse.json(
      { data: []},
      { status: 500 }
    );
  }
};



export default async function POST(product: Product) {
  const { name, details, price, pic_path, in_cart, cart_qty } = product;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, details, price, pic_path, in_cart, cart_qty) VALUE($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, details, price, pic_path, in_cart, cart_qty]
    );
    if (!result.rows[0]) {
      console.log("Failed to insert the new product to the table");
      return NextResponse.json(
        {result: false},
        {status: 300}
      );
    }
    console.log(`Succeeded to insert the product ${name}!`);
    return NextResponse.json(
      {result: true},
      {status: 200}
    );

  } catch (err) {
    console.error(`Error while accessing DB: ${err}`);
    return NextResponse.json(
      {result: false},
      {status: 500}
    );
  }
}