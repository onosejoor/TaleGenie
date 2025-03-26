import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "./lib/actions/dal";

const protectedRoutes = [/^\/dashboard(\/.*)?$/, /^\/create$/, /^\/settings$/];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const { isAuth } = await verifySession();

  const isProtected = protectedRoutes.some((regex) => regex.test(path));

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
