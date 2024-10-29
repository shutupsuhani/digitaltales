import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb'; 
import UserModel from '@/models/User'; 
import bcrypt from 'bcrypt';


export async function POST(request: Request) {
    await connectMongo(); 
  
    const body = await request.json(); 
  
    
    const { username, password } = body;
  
    if (!username || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
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

    return NextResponse.json({ message: 'Sign-in successful', user: { username: user.username, email: user.email } },{status:200});
  
 }catch(error){
    return NextResponse.json({ message: 'Error during sign-in'},{status:500});
 }
   
}
  