'use server';
import { pool } from "./db";



export default async function getProducts() {
  try {
    const result = await pool.query("SELECT * FROM products");
    if(result.rows.length === 0) {
      console.log("No products found in DB");
      return [];
    }
    console.log("Data fetched from DB: ", result.rows);
    return result.rows;
  } catch(err) {
    console.error("Error while fetching data", err);
    return [];
  }
};