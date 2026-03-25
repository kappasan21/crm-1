'use server';
import { pool } from "@/db/db";



// Insert the target item into Cart
// Returns: true or false 
export async function UpdateCart(prodId: number) {

  try {
    const result = await pool.query(
      'UPDATE products SET in_cart = $1, cart_qty = cart_qty + 1 WHERE id = $2 RETURNING *',
      [true, prodId]
    );
    if(!result.rows[0]) {
      console.log("Failed to update product data...");
      return false;
    }
    console.log("Updated Item: ", result.rows[0]);
    return true;
  } catch (err) {
    console.error("Error while connecting DB: ", err);
    return false;
  }
}