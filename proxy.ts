import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Stash the pathname for the CMS overlay. The response itself is unchanged.
 * Redirects from next.config still run before this proxy.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
