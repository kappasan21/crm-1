'use server';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';



export async function getDataInToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return "no login user";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    console.log("Data in JWT: ", decoded);
    return decoded;
  } catch {
    console.error("Failed to get data in JWT");
    return "Error while Logging in";
  }

};

