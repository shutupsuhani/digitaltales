import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// Define protected routes
const isProtectedRoute = createRouteMatcher(['/writeblog(.*)', '/']);

// Middleware handler
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
    
});




// Configuration for route matching
export const config = {
    matcher: [
        '/',
        '/feed(.*)',
        '/writeblog(.*)',
        '/api/post/create-a-post',
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
        "/((?!_next|favicon.ico).*)"
    ],
};


