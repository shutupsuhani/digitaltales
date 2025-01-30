import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignOutButton
} from '@clerk/nextjs';
import './globals.css';
import { Outfit } from "next/font/google";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <RedirectToSignIn /> {/* Redirect to sign-in page if not signed in */}
          </SignedOut>
          
          <SignedIn>
            <div className="user-info">
              <p>Welcome, user!</p>
              <SignOutButton /> {/* Sign out button */}
            </div>
          </SignedIn>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
