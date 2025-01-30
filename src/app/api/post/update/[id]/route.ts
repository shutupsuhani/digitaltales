import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connectMongo from "@/lib/db";
import jwt from "jsonwebtoken";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();

    // Extract token from the Authorization header
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token || !JWT_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token and extract user ID
    let userId;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // Fetch the updated post data from the request body
    const { title, content } = await request.json();

     // Use await to get the id from params
     const postId = await params.id; // This is the updated line

     // Find the post by ID and ensure the user is the author
     const post = await Post.findById(postId);
 

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (String(post.author) !== userId) {
      return NextResponse.json({ message: "You are not authorized to update this post" }, { status: 403 });
    }

    // Update the post fields
    post.title = title || post.title; // Only update if a new title is provided
    post.content = content || post.content; // Only update if new content is provided

    await post.save(); 

    return NextResponse.json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}
