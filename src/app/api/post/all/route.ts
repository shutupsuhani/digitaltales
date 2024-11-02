import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connectMongo from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    await connectMongo();

    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token || !JWT_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const posts = await Post.find().populate("author", "username email");

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
  }
}
