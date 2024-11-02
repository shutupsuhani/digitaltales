//auth/signin-with-google/route.ts

import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb'; 
import UserModel from '@/models/User'; 


export async function POST(request: Request) {
    try {
      
        const { uid, email, firstname, lastname, username, photoURL } = await request.json();
    
        await connectMongo();
    
        let user = await UserModel.findOne({ $or: [{ googleId: uid }, { email }] });
    
        if (!user) {
          user = new UserModel({
            googleId: uid,
            email,
            firstname,
            lastname,
            username,
            photoURL,
          });
          await user.save();
        }
    
        return NextResponse.json({ message: "User signed in successfully", user });
      } catch (error) {
        console.error("Error in Google Sign-In:", error);
        return NextResponse.json({ error: "An error occurred during sign-in" }, { status: 500 });
      }
   
}













