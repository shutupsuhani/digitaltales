import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import connectMongo from '@/lib/db';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectMongo(); // Connect to MongoDB

        // Verify the JWT token from the Authorization header
        const authHeader = request.headers.get("Authorization") || "";
        const token = authHeader.split(" ")[1];
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!token || !JWT_SECRET) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
            userId = decoded.userId; // Get userId from token
        } catch (error) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
        }

        // Await params to access the id
        const postId = await params.id; // Correctly await params here

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
        }

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const body = await request.json();
        const { like } = body; // Expecting { like: boolean }

        if (typeof like !== 'boolean') {
            return NextResponse.json({ message: "Invalid like value, must be boolean" }, { status: 400 });
        }

        // Update likedBy array and likes count based on the like boolean
        if (like) {
            if (!post.likedBy.includes(userId)) {
                post.likedBy.push(userId);
                post.likes += 1; 
            }
        } else {
            if (post.likedBy.includes(userId)) {
                post.likedBy = post.likedBy.filter((uid: string) => uid !== userId);
                post.likes -= 1; 
            }
        }

        // Save the updated post
        await post.save();

        return NextResponse.json({ message: like ? "Post liked" : "Post unliked", likes: post.likes });
    } catch (error) {
        console.error("Error updating like status:", error);
        return NextResponse.json({ message: "Error updating like status" }, { status: 500 });
    }
}
