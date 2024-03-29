import { beatFetcher } from "@/lib/core/httpClient";
import { HttpClientError } from "@/lib/exceptions/exceptions";
import { RequestBody } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { options, data, requestOptions }: RequestBody = await request.json();
  const { resource, method } = options;
  const authHeader = request.cookies.get("access-token")?.value || "";
  try {
    beatFetcher.baseUrl = process.env.API_URL;

    console.log("AUTHORIZATION HEADER", authHeader);
    beatFetcher.setHeaders({
      authorization: `Bearer ${authHeader}`,
    });
    const result = await beatFetcher.fetch(
      resource,
      method,
      data,
      requestOptions
    );

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof HttpClientError) {
      console.log("ERROR API/API", {
        error,
        resource,
        method,
        data,
      });

      return NextResponse.json(
        {
          message: error.message,
          errors: error.errors,
        },
        {
          status: error.statusCode,
        }
      );
    }
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
        errors: {},
      },
      {
        status: 500,
      }
    );
  } finally {
    beatFetcher.baseUrl = undefined;
  }
}
