import Feed from "@/app/feed/components/Feed";
import Navbar from "@/app/feed/components/Navbar";
import Rightbar from "@/app/feed/components/Rightbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="scrollbar-hide">
    <div > 
      <Navbar/>
      <div className="container mx-auto p-6 flex flex-col lg:flex-row lg:space-x-6">
      <main className="flex-1">
        <Feed />
      </main>
      <aside className="lg:w-1/4 mt-6 lg:mt-0">
         <Rightbar/>
      </aside>
    </div>


     
    </div>

    </div>
  );
}
