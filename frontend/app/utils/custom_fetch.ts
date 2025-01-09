import Cookies from "js-cookie";

type FetchOption = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  next?: { revalidate?: number | boolean};
  cache?: RequestCache; 
};

async function customFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
  options: FetchOption = {}
): Promise<T> {

  const accessToken = Cookies.get('accessToken');  
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(
          "http://localhost:8000/api/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );
        if (refreshResponse.ok) {
          const { access } = await refreshResponse.json();
          Cookies.set("accessToken", access);
          const retyHeaders = {
            ...headers,
            Authorization: `Bearer ${access}`,
          };
          const retryResponse = await fetch(url, {
            ...options,
            method,
            headers: retyHeaders,
            body: body ? JSON.stringify(body) : undefined,
          });
          return retryResponse.json() as Promise<T>;
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error refreshing token: ", error);
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
// refreshToken

export default customFetch; 