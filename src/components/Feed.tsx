"use client"

import CategoryNav from "./CategoryNav"
import Post from "@/components/Post"
const Feed = () => {
  return (
    <div className="border-gray-200 border-r overflow-y-auto pr-4 h-full">
         <div className="flex items-center justify-center ">
           <CategoryNav/>
        </div>
        <Post/>
    </div>
   
  )
}

export default Feed