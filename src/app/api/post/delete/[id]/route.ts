import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connectMongo from "@/lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();

    // Extract token from Authorization header
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token || !JWT_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    let userId;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // Find the post by ID and check if the user is the author
    const postId = await params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (String(post.author) !== userId) {
      return NextResponse.json({ message: "You are not authorized to delete this post" }, { status: 403 });
    }

    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
  }
}
