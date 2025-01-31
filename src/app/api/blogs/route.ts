// Updated route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../utils/db'; 
import { Blogs } from '../../../utils/schema';
import { clerkClient } from '@clerk/express';

export async function GET(request: Request) {
  try {
    const blogs = await db.select().from(Blogs);

    const blogsWithUserInfo = await Promise.all(
      blogs.map(async (blog) => {
        try {
          // Fetch user by userId instead of email
          const user = await clerkClient.users.getUser(blog.createdBy); // `blog.createdBy` is now a userId
         // const response = await clerkClient.users.getUser(userId)
         
        
         return {
            ...blog,
            username: user.username, // Assuming Clerk stores `username`
            profileImage: user.imageUrl
          };
        } catch (error) {
          console.error("Error fetching user:", error);
          return {
            ...blog,
            username: "Unknown",  // Fallback username
            profileImage: '/default-profile.jpg',
          };
        }
      })
    );

    return NextResponse.json(blogsWithUserInfo);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
  }
}
