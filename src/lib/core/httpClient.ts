import { json } from "stream/consumers";
import { HttpClientError } from "../exceptions/exceptions";
import { Method, RequestBody, body } from "@/types";

class HttpClient {
  private static defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    credentials: "include",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  private static defaultOptions: RequestInit = {
    headers: this.defaultHeaders,
  };
  static baseUrl: string | undefined;

  static setHeaders(headers: HeadersInit) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
    this.setDefaultOptions({
      headers: this.defaultHeaders,
    });
  }
  static setDefaultOptions(options: RequestInit) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...options,
    };
  }
  static fetch(
    resource: string,
    _method: Method,
    _body: body | undefined = undefined,
    options: RequestInit | undefined
  ) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const url = this.baseUrl
          ? this.getUrl(resource)
          : (process.env.HOST || process.env.NEXT_PUBLIC_HOST) + "/api/api";

        const method = this.baseUrl ? _method : "POST";
        const body = this.baseUrl
          ? JSON.stringify(_body)
          : this.getBody(resource, _method, _body, options);
      
        const res = await fetch(url, {
          ...this.defaultOptions,
          ...options,
          body,
          method,
        });
        let data;
        try {
          data = await res.json();
        } catch (error) {
          data = undefined;
        }
        if (!res.ok) {
          reject(
            new HttpClientError(
              data?.message || res.statusText,
              data?.errors || {},
              res.status
            )
          );
        }

        resolve(data);
      } catch (error) {
        reject(
          new HttpClientError(
            error instanceof Error ? error.message : "Http Client Error"
          )
        );
      }
    });
  }

  private static getUrl(resource: string) {
    if (resource.slice(0, 1) !== "/") {
      resource = `/${resource}`;
    }
    const url = `${this.baseUrl}${resource}`;

    return url;
  }
  static get(resource: string, options: RequestInit = {}) {
    return this.fetch(resource, "GET", undefined, options);
  }
  private static getBody(
    resource: string,
    method: Method,
    body: { [key: string]: any } | undefined = undefined,
    options: RequestInit | undefined = undefined
  ) {
    const _body: RequestBody = {
      options: {
        method,
        resource,
      },
      data: body,
      requestOptions: options,
    };

    return JSON.stringify(_body);
  }
  static post(
    resource: string,
    body: { [key: string]: any },
    options: RequestInit = {}
  ) {
    return this.fetch(resource, "POST", body, options);
  }
  static patch(
    resource: string,
    body: { [key: string]: any },
    options: RequestInit = {}
  ) {
    return this.fetch(resource, "POST", body, options);
  }
}

export const beatFetcher = HttpClient;
