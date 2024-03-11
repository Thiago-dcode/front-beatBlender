import { HttpClientError } from "../exceptions/exceptions";
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
  static fetch(resource: string, options: RequestInit = {}) {
    return new Promise<any>(async (resolve, reject) => {
     try {
        const res = await fetch(this.getUrl(resource), {
          ...this.defaultOptions,
          ...options,
        });
        let data;
        try {
          data = await res.json();
        } catch (error) {
          data = undefined;
        }
        if (!res.ok) {
          if (res.status === 401) {
            console.log("RESULT", res);
          }
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
    return this.fetch(resource, options);
  }
  static post(
    resource: string,
    body: { [key: string]: any },
    options: RequestInit = {}
  ) {
    return this.fetch(resource, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }
  static patch(
    resource: string,
    body: { [key: string]: any },
    options: RequestInit = {}
  ) {
    return this.fetch(resource, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }
}

HttpClient.baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
console.log('BASE URL',process.env.NEXT_PUBLIC_API_URL , process.env.API_URL)
export const beatFetcher = HttpClient;
