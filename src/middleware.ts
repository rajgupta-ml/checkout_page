import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
	'/',
	'/sign-in(.*)',
	'/sign-up(.*)', 
	"/live-preview", 
	"/thank-you",
	'/analytics',
	"/api/v1/analytics"
]);


const allowedSubdomainPaths = [
	'/live-preview',
	'/thank-you',
	'/analytics',
	'/api/v1/analytics'
  ];


export default clerkMiddleware(async (auth, req) => {
	const hostname = req.headers.get('host') || '';
	const isSubdomain =
		hostname.endsWith('.localhost:3000') && hostname !== 'localhost:3000';
	// Allow /live-preview only for subdomains, block others

	  
	  if (isSubdomain && allowedSubdomainPaths.includes(req.nextUrl.pathname)) {
		return;
	  }
	  
	// All other subdomain paths are protected
	if (isSubdomain && !isPublicRoute(req)) {
		await auth.protect();
	}

	if (!isPublicRoute(req)) {
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
