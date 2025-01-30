import { NextResponse } from 'next/server';
import Post from '@/models/Post'; // Adjust the import path based on your structure
import connectMongo from '@/lib/db'; // Ensure you have this utility to connect to MongoDB
import jwt from 'jsonwebtoken';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectMongo(); // Connect to MongoDB

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

        const { id } = params;

        // Find the post by ID
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Ensure likedBy is initialized as an array
        post.likedBy = post.likedBy || [];

        // Check if the user has already liked the post
        const hasLiked = post.likedBy.includes(userId);
        
        if (!hasLiked) {
            // User has not liked the post, so like it
            post.likedBy.push(userId);
            post.likes += 1; // Increment likes
            return NextResponse.json({ message: "Post liked", likes: post.likes });
        } else {
            // User has already liked the post, so unlike it
            post.likedBy = post.likedBy.filter((uid: string) => uid !== userId);
            post.likes = Math.max(post.likes - 1, 0); // Decrement likes but not below 0
            return NextResponse.json({ message: "Post unliked", likes: post.likes });
        }

        // Save the updated post
        await post.save();
        
    } catch (error) {
        console.error("Error updating like status:", error);
        return NextResponse.json({ message: "Error updating like status" }, { status: 500 });
    }
}
