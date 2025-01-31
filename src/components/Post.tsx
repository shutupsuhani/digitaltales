import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";


const Post: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]); // Store blog data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching
  const {user} = useUser();

  const photo_url=user?.imageUrl;
  const name=user?.username;

  useEffect(() => {
    // Function to fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blogs/'); // API endpoint for blogs
        const data = await response.json();
        
        console.log(data)
        setBlogs(data); // Set the fetched blogs into state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching
  }

  return (
    <>
      {blogs.length === 0 ? (
        <p>No blogs available at the moment.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border-b border-gray-200 py-4 px-6 flex flex-col space-y-4">
            {/* Author Info */}
            <div className="flex items-center border-b border-gray-200 space-x-3">
              <Image
                src={blog.profileImage } // Use profile image or fallback
                alt="Author's profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">{blog.username}</p> {/* Display username */}
                <p className="text-xs text-gray-500">{blog.createdAt}</p> {/* Display blog date */}
              </div>
            </div>

            {/* Post Title and Content */}
            <div>
              <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
              <p className="text-gray-700 text-sm line-clamp-3">{blog.content}</p>
            </div>

            {/* Post Interactions */}
            <div className="flex space-x-6 text-gray-500 text-xs">
              <span>
                <FaHeart /> {blog.likes} Likes
              </span>
              <span>🔗 Share</span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Post;
