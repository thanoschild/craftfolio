import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { PRIVATE_ROUTES } from './lib/privateRoutes';
import { rateLimit } from './lib/rateLimit';
import { NextRequest, NextResponse } from 'next/server';

const isPrivateRoute = createRouteMatcher(
  PRIVATE_ROUTES.map((route) => `/${route}`),
);

const isApiRoute = createRouteMatcher(['/api/(.*)']);

function getClientIP(req: NextRequest): string {
  // Try various headers in order of preference
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

export default clerkMiddleware(async (auth, req) => {
  if (isApiRoute(req)) {
    const ip = getClientIP(req);
    console.log(`Request from IP: ${ip}`);

    // Global rate limit: 30 requests per minute per IP
    if (!rateLimit(`global:${ip}`, 30, 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests from this IP" },
        { status: 429 }
      );
    }
  }

  // Protect all private routes - require authentication
  if (isPrivateRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};