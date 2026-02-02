import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECT_HOST = process.env.REDIRECT_HOST?.toLowerCase();

export function middleware(request: NextRequest) {
  if (!REDIRECT_HOST) {
    return NextResponse.next();
  }

  const hostname = request.headers.get("host");
  const forwardedHost = request.headers.get("x-forwarded-host");

  const host = hostname?.toLowerCase();
  const forwarded = forwardedHost?.toLowerCase();

  const hostWithoutWww = REDIRECT_HOST.replace(/^www\./, "");
  const hostWithWww = REDIRECT_HOST.startsWith("www.")
    ? REDIRECT_HOST
    : `www.${REDIRECT_HOST}`;

  if (
    host === hostWithWww ||
    host === hostWithoutWww ||
    forwarded === hostWithWww ||
    forwarded === hostWithoutWww
  ) {
    return NextResponse.redirect(
      "https://www.affinaloyalty.com/crowdplay",
      301,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
