
import { HttpClientError } from "../exceptions/exceptions";

class HttpClient {
  private defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    credentials: "include",
  };
  private defaultOptions: RequestInit = {
    headers: this.defaultHeaders,
  };
  constructor(
    public baseUrl: string | undefined,
    defaultOptions: RequestInit = {}
  ) {
    this.setDefaultOptions(defaultOptions);
  }

  setHeaders(headers: HeadersInit) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
    this.setDefaultOptions({
      headers: this.defaultHeaders,
    });
  }
  setDefaultOptions(options: RequestInit) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...options,
    };
  }
  fetch(resource: string, options: RequestInit = {}) {
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
          console.log("RESPONSE", res);
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

  private getUrl(resource: string) {
    if (resource.slice(0, 1) !== "/") {
      resource = `/${resource}`;
    }
    const url = `${this.baseUrl}${resource}`;

    return url;
  }
  get(resource: string, options: RequestInit = {}) {
    return this.fetch(resource, options);
  }
  post(
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
  patch(
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
const defaultHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer {token}`,
};
export const fetchFromClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL);

export const fetchFromServer = new HttpClient(process.env.API_URL);
