"use client";

const Rightbar = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "How to Master React in 2024",
      thumbnail: "https://via.placeholder.com/150",
      date: "November 10, 2024",
      excerpt: "Learn the top techniques to master React development this year...",
    },
    {
      id: 2,
      title: "Understanding Next.js Rendering",
      thumbnail: "https://via.placeholder.com/150",
      date: "November 12, 2024",
      excerpt: "Explore the differences between SSR, SSG, and ISR in Next.js...",
    },
    {
      id: 3,
      title: "CSS Tricks for Modern Web Design",
      thumbnail: "https://via.placeholder.com/150",
      date: "November 14, 2024",
      excerpt: "Enhance your designs with these cutting-edge CSS techniques...",
    },
    {
      id: 4,
      title: "How to Master React in 2024",
      thumbnail: "https://via.placeholder.com/150",
      date: "November 10, 2024",
      excerpt: "Learn the top techniques to master React development this year...",
    },
    {
      id: 5,
      title: "Understanding Next.js Rendering",
      thumbnail: "https://via.placeholder.com/150",
      date: "November 12, 2024",
      excerpt: "Explore the differences between SSR, SSG, and ISR in Next.js...",
    },
    {
      id: 6,
      title: "CSS Tricks for Modern Web Design",
      thumbnail: "https://via.placeholder.com/150",
      date: "November 14, 2024",
      excerpt: "Enhance your designs with these cutting-edge CSS techniques...",
    },
  ];

  return (
    <div>
      <h2 className="text-center font-serif font-semibold">Some Popular Blogs</h2>
      <div className="flex cursor-pointer flex-col p-4 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg shadow-lg overflow-hidden bg-white"
          >
            
            <div className="p-4">
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <p className="text-sm text-gray-500">{blog.date}</p>
              <p className="text-sm text-gray-700 mt-2">{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
