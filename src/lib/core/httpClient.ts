import { HttpClientError } from "../exceptions/exceptions";

class HttpClient {
  constructor(
    public baseUrl: string | undefined,
    readonly defaultOptions: RequestInit = {}
  ) {
    if (!this.baseUrl) {
      throw new HttpClientError("No base url provided in HttpClient");
    }
  }

  fetch(resource: string, options: RequestInit = {}) {
    if (resource.slice(0, 1) !== "/") {
      resource = `/${resource}`;
    }
    const url = this.baseUrl ? `${this.baseUrl}${resource}` : resource;
    return fetch(url, options);
  }

  private getUrl(resource: string) {
    if (resource.slice(0, 1) !== "/") {
      resource = `/${resource}`;
    }
    const url = this.baseUrl ? `${this.baseUrl}${resource}` : resource;

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
    return this.fetch(this.getUrl(resource), {
      ...this.defaultOptions,
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
    return this.fetch(this.getUrl(resource), {
      ...this.defaultOptions,
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }
}
const defaultHeader = {
  "Content-Type": "application/json",
};
export const fetchClient = new HttpClient(process.env.NEXT_PUBLIC_HOST, {
  headers: defaultHeader,
});
export const fetchServer = new HttpClient(process.env.HOST, {
  headers: defaultHeader,
});
