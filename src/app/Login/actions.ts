'use server';
import { redirect } from "next/navigation";
import { pool } from "@/db/db";
import bcrypt from 'bcrypt';
// For cookies/jwt use
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";


// import LoginProcessPage from "./LoginProcess/page";



// Do not forget add prevState in case to use useActionState in the
export default async function handleLogin(prevState: {error?: string } | null, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const remember = formData.get('remember') === 'on';
  console.log("Form inputs: ", email, ", ", password, ", ", remember);


  if (!email || !password) {
    console.log("Invalid credentials");
    // return redirect('/Login');
    return { error: "Invalid credentials!"};
  }
  
  if (email === 'admin@test.com' && password === 'admin') {
    console.log("Admin login successful");
    // TODO: Later, create admin limited functions and redirect to admin menu
    redirect('/MainMenu');
  }

  // Check credentials for other than admin
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  console.log("User found in DB: ", user);
  if (!user) {
    console.log("User not found");
    return { error: "User not found!"};
  }
  // Use bcrypt to validate password securely (compare entered password to db hash)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Invalid password");
    return { error: "Invalid password!"};
  }

  
  // Create JWT
  const token = jwt.sign(
    {userId: user.id, username: user.username, email: user.email},
    process.env.JWT_SECRET!,
    {expiresIn: '1h'}
  );
  // Set JWT in Cookie to the browser
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,                                  // Cannot be accessed from JS
    secure: process.env.NODE_ENV === 'production',   // HTTPS only - production env
    sameSite: 'lax',
    path: '/',
  });
  console.log("Created token: ", token);

  console.log("User login successful");
  // return redirect('/MainMenu');
  return redirect('/Login/LoginProcess');
};








// How to read token data
// import { cookies } from 'next/headers'
// import jwt from 'jsonwebtoken'

// export async function getCurrentUser() {
//   const token = cookies().get('token')?.value
//   if (!token) return null

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!)
//     return decoded
//   } catch {
//     return null
//   }
// };