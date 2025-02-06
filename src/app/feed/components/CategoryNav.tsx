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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 200;
      current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="relative flex items-center overflow-hidden w-2/4 border-b border-gray-200 py-2">
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
