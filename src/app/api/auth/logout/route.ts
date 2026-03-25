import { NextResponse } from "next/server";


export async function POST() {
  console.log("Start logout processes...");
  const res = NextResponse.json({
    success: true
  });

  // Clear cookies
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return res;
}