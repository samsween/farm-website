import type { NextRequest } from "next/server";
import { getSession, updateSession } from "./lib/auth";

export default async function middleware(request: NextRequest) {
  const currentUser = await getSession();
  await updateSession(currentUser);
  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }
  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
