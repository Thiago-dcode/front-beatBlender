import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const token = cookies().get("jwt-token");
  requestHeaders.set("authorization", `Bearer ${token}`);

  const response = NextResponse.next({
    headers: requestHeaders,
  });
  return response;
}
