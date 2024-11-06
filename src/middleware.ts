import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  afterSignInUrl: '/browse',
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
