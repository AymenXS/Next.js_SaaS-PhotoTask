import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/api/webhooks/clerk', '/api/webhooks/stripe', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// // Define the public routes
// const publicRoutes = createRouteMatcher(['/', '/api/webhooks/clerk', '/api/webhooks/stripe', '/sign-in(.*)', '/sign-up(.*)']);

// export default clerkMiddleware((auth, request) => {
//   // If the route is public, allow access without authentication
//   if (publicRoutes(request)) {
//     return;
//   }

//   // Otherwise, protect the route
//   auth().protect();
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
