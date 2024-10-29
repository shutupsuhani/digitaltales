// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb'; 
import UserModel from '@/models/User'; 
import bcrypt from 'bcrypt'; 

export async function POST(request: Request) {
  await connectMongo(); 

  const body = await request.json(); 

  // Validate the incoming data
  const { firstname, lastname, email, username, password } = body;

  if (!firstname || !lastname || !email || !username || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

 
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await UserModel.create({
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
  });

  return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 200 });
}
