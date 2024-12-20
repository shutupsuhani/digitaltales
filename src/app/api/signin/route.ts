import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb'; 
import UserModel from '@/models/User'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_KEY=process.env.JWT_SECRET;

export async function POST(request: Request) {
    await connectMongo(); 
  
    const body = await request.json(); 
  
    
    const { username, password } = body;
  
    if (!username || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!JWT_KEY) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
  
   
    try{
    const user = await UserModel.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 409 });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if(!isMatch){
        return NextResponse.json({ error: 'Invalid Password' }, { status: 401 });
    }
    
    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
       JWT_KEY,  
      { expiresIn: '1h',algorithm: 'HS256' }      
  );
   
    
    return NextResponse.json({ message: 'Sign-in successful', user: { username: user.username,token, email: user.email } },{status:200});
  
 }catch(error){
    return NextResponse.json({ message: 'Error during sign-in'},{status:500});
 }
   
}
  