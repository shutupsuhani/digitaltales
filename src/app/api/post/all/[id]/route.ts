import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connectMongo from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function GET(request: Request,{ params }: { params: { id: string } }) {
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

    // Find posts by the user
    const userPosts = await Post.find({author:params.id}).populate("author", "username email");

    if (!userPosts.length) {
      return NextResponse.json({ message: "No posts have been posted" }, { status: 404 });
    }

    return NextResponse.json(userPosts);
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    return NextResponse.json({ message: "Error fetching user's posts" }, { status: 500 });
  }
}
