import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";



export async function GET(req) {
  try {
    // Take out token from cookies and accept the case of no token
    const token = req.cookies.get("token")?.value;
    if(!token) {
      console.log("No token found...");
      return NextResponse.json(
        {valid: false},
        {status: 401}
      );
    }
    console.log("Current token before validation: ", token);
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Error while validating token: ", err);
    return NextResponse.json(
      { valid: false},
      { status: 401 }
    );
  }
};