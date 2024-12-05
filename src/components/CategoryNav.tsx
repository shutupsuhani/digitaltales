"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "Writing",
  "Software Development",
  "Machine Learning",
  "Data Science",
  "Technology",
  "Programming",
  "Travelling",
  "Food",

];

const CategoryNav = () => {
  const scrollRef = useRef(null);

  // Scroll handler
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative flex items-center overflow-hidden w-80 border-b border-gray-200 py-2">
      {/* Left Chevron */}
      <button
        className="absolute left-0 z-10 bg-white p-1"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="text-gray-400" />
      </button>

      {/* Category List */}
      <div
        ref={scrollRef}
        className="flex space-x-4 mx-auto overflow-x-hidden hide-scroll-bar px-8"
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className="text-gray-700 whitespace-nowrap hover:text-black transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Chevron */}
      <button
        className="absolute right-0 z-10 bg-white p-1"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="text-gray-400" />
      </button>
    </div>
  );
};

export default CategoryNav;
