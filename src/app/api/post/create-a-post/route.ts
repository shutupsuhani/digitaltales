import  Post  from "@/models/Post";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectMongo from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
   
    await connectMongo();

    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const JWT_SECRET= process.env.JWT_SECRET;
    console.log(token)
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const userId = decoded.userId;

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newPost = new Post({
      title,
      content,
      author: user._id,
    });
    
    await newPost.save();
    return NextResponse.json({ message: "Post created successfully", post: newPost });

  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Error creating post", }, { status: 500 });
  }
}
