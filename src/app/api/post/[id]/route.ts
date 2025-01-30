

/*import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connectMongo from "@/lib/mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }){
   try{
      await connectMongo();

      const post=await Post.findById(params.id).populate("author","username email");

      if(!post){
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
      
      return NextResponse.json(post);

   }catch(error){
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
   }


} */


   import { NextResponse } from "next/server";
   import jwt from "jsonwebtoken";
   import Post from "@/models/Post";
   import connectMongo from "@/lib/db";
   
   const JWT_SECRET = process.env.JWT_SECRET;
   
   export async function GET(request: Request, { params }: { params: { id: string } }) {
     try {
       await connectMongo();
   
       // Check for Authorization header and retrieve token
       const authHeader = request.headers.get("Authorization") || "";
       const token = authHeader.split(" ")[1];
   
       if (!token) {
         return NextResponse.json({ message: "Unauthorized: Token missing" }, { status: 401 });
       }
   
       // Verify token
       let decoded;
       try {
         decoded = jwt.verify(token, JWT_SECRET as string);
       } catch (err) {
         return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
       }
   
       // Fetch the post if authorization is successful
       const post = await Post.findById(params.id).populate("author", "username email");
       if (!post) {
         return NextResponse.json({ message: "Post not found" }, { status: 404 });
       }
   
       return NextResponse.json(post);
     } catch (error) {
       console.error("Error fetching post:", error);
       return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
     }
   }
   
   