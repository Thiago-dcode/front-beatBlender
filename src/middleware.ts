import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/utils";
import { beatFetcher } from "./lib/core/httpClient";
import { RefreshToken, RequestBody } from "./types";
import appConfig from "./config";
export async function middleware(req: NextRequest) {
  console.log("ACCESSING MIDDLEWARE:", req.url);
  const requestHeaders = new Headers(req.headers);
  const response = NextResponse.next({
    headers: requestHeaders,
  });
  response.headers.set("x-middleware-cache", "no-cache");
  if (!req.body) {
    console.log("NULL BODY", req.url);
    return response;
  }

  try {
    const body: RequestBody | null = await req.json();
    if (!body) {
      console.error("NO BODY FOUND IN MIDDLEWARE");
      return response;
    }

    const { method, resource } = body.options;
    const authApiResources: Record<string, RegExp[]> =
      appConfig.authApiResources;

    if (!authApiResources[method]) {
      return response;
    }
    const matchingRegex = authApiResources[method].find((regex) =>
      regex.test(resource)
    );
    if (!matchingRegex) {
      //PUBLIC ROUTE
      console.log("//PUBLIC API RESOURCE//", method, resource);
      return response;
    }
    //handle auth api resources
    console.log("//AUTH API RESOURCE//", method, resource);

    const jwt = req.cookies.get("access-token")?.value;
    const refreshJwt = req.cookies.get("refresh-token")?.value;
    if (!jwt || !refreshJwt) return response;

    const isValidJwt = await verifyJwt(jwt, process.env.JWT_KEY || "");
    if (isValidJwt) {
      //JWT access token still valid, no need to refresh it

      requestHeaders.set("authorization", `Bearer ${jwt}`);

      console.log("ACCESS TOKEN IS VALID");

      return response;
    }

    const isvalidRefreshJwt = await verifyJwt(
      refreshJwt,
      process.env.JWT_KEY || ""
    );

    console.log("ACCESS TOKEN IS NOT VALID");
    if (!isvalidRefreshJwt) return response;

    console.log("--- STARTING REFRESHING TOKEN ---");

    beatFetcher.baseUrl = process.env.API_URL;
    const { accessToken, newRefreshToken }: RefreshToken =
      await beatFetcher.post("/auth/refresh-token", {
        ["refresh-token"]: refreshJwt,
      });
    beatFetcher.baseUrl = undefined;
    console.log("NEW ACCESS TOKEN IS VALID");
    requestHeaders.set("authorization", `Bearer ${accessToken}`);

    response.cookies.set("refresh-token", newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
    response.cookies.set("access-token", accessToken, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error) {
    console.error("ERROR MIDDLEWARE", error);
    return response;
  } finally {
    beatFetcher.baseUrl = undefined;
  }
}
export const config = {
  matcher: "/api/api/:path*",
};
