"use client";
import React,{useState,useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconBrandGoogle,
  IconBrandGoogleFilled,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { auth, provider, signInWithPopup } from "@/app/firebaseConfig";
import Link from "next/link";

export function SignupFormDemo() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const formData = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

    try{

      const response = await fetch('/api/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`User created: ${data.user.username}`);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }

    } catch(error){
      console.error('Network error:', error);
      setMessage('Network error, please try again later.');
    }


  };
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          firstname: user.displayName?.split(" ")[0] || "",
          lastname: user.displayName?.split(" ")[1] || "",
          username: user.email?.split("@")[0] || "",
          photoURL: user.photoURL,
        };

        const response = await fetch("/api/auth/signin-google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(`User Sign In: ${data.user.username}`);
        } else {
          const errorData = await response.json();
          setMessage(`Error: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setMessage("Google sign-in failed. Please try again.");
    }
  };



  return (
    <div className="max-w-md mt-20 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
        Welcome to Digital-Tales 
      </h2>
     

      <form className="my-8 " onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler"  value={firstname}
          onChange={(e) => setFirstname(e.target.value)} type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden"  value={lastname}
          onChange={(e) => setLastname(e.target.value)} type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com"  value={email}
          onChange={(e) => setEmail(e.target.value)} type="email" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Username"  value={username}
          onChange={(e) => setUsername(e.target.value)} type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" value={password}
            onChange={(e) => setPassword(e.target.value)}  type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Confirm  Password
          </Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"

            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>} {/* Display message */}
        
        <p className="font-serif mt-3">Already Have An Account?<Link href='/signin'><span className="text-blue-500">Sign in</span></Link></p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandFacebook className="h-4 w-4 text-blue-800 " />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
               facebook
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"  onClick={handleGoogleSignIn}
          >
           
            <img src="./gi.jpg" className="h-4 w-4 rounded-full"/>
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
         
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
