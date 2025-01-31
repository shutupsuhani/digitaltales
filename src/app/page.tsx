'use client'

import Header from "@/components/Header";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function LandingPage() {
 
  const handleSubscribe=()=>{
    alert('Successfully Subscribed!')
  }
 
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      
       <div>
        <Header/>
       </div>
     
      {/* Hero Section */}
      <section className="text-center py-20 bg-white shadow-md">
        <h1 className="text-5xl font-extrabold tracking-wide text-gray-800">Welcome to digiTales</h1>
        <p className="mt-4 text-lg text-gray-600">Explore the world of AI-driven storytelling</p>
        <Link href="/feed">
          <button className="mt-6 px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold shadow-md hover:bg-gray-700">
            Discover Stories
          </button>
        </Link>
      </section>
      
      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-700">Latest digiTales</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-800">The Rise of AI Storytelling</h3>
            <p className="text-gray-600 mt-2">How AI is reshaping the art of digital narratives.</p>
            <Link href="/feed/ai-storytelling" className="text-blue-600 mt-4 inline-block hover:text-blue-500">Read More →</Link>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-800">Neural Networks and Creativity</h3>
            <p className="text-gray-600 mt-2">Exploring AI's role in creative content generation.</p>
            <Link href="/feed/neural-creativity" className="text-blue-600 mt-4 inline-block hover:text-blue-500">Read More →</Link>
          </div>
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="text-center py-16 bg-gray-200">
        <h2 className="text-3xl font-bold text-gray-700">Join the digiTales Community</h2>
        <p className="text-gray-600 mt-2">Receive the latest AI-powered stories straight to your inbox.</p>
        <input
          type="email"
          placeholder="Enter your email" required
          className="mt-4 px-4 py-2 w-80  rounded-lg border border-gray-400 bg-white text-gray-800 placeholder-gray-500 shadow-sm"
        />
        <button onClick={handleSubscribe} className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700">
          Subscribe
        </button>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-6 bg-white shadow-md text-gray-600">
        <p>© 2025 digiTales. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <FaTwitter size={24} />
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <FaLinkedin size={24} />
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <FaGithub size={24} />
          </Link>
        </div>
      </footer>
    </div>
  );
}