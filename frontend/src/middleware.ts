import { NextRequest, NextResponse } from "next/server";

/** Force a single host so Google does not index both apex and www. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host === "theleasereview.com") {
    const { pathname, search } = request.nextUrl;
    const destination = `https://www.theleasereview.com${pathname}${search}`;
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next internals and static files.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
