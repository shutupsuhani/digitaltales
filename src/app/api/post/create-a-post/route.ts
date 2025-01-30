import { auth } from "@clerk/nextjs/server";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/db";

export async function POST(req: Request) {
  await connectMongo(); // Ensure MongoDB is connected
  const { userId } = auth(); // Get Clerk User ID
  
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // Fetch Clerk user details
    const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` }
    }).then(res => res.json());

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Store user in MongoDB if not exists
    let existingUser = await User.findById(userId);
    if (!existingUser) {
      existingUser = new User({
        _id: userId,
        email: user.email_addresses[0]?.email_address || "",
        username: user.username,
        image: user.image_url,
      });
      await existingUser.save();
    }

    // Get blog data from request
    const { title, content } = await req.json();

    // Save the new blog post
    const newPost = new Post({
      title,
      content,
      author: userId, // MongoDB now has this user
    });

    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating post", error: error.message }, { status: 500 });
  }
}
