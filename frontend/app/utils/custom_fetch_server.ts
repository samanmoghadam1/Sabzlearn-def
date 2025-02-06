'use server'; 


import { cookies } from "next/headers";
import { redirect } from "next/navigation"; 

type FetchOption = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  next?: { revalidate?: number | boolean };
  cache?: RequestCache;
};

async function customServerFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
  options: FetchOption = {}
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value; 

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken || ""}`,
    "Content-Type": "application/json",
  };

  
  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  
  if (response.status === 401) {
    const refreshToken = cookieStore.get("refreshToken")?.value;
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

          headers.Authorization = `Bearer ${access}`;
          const retryResponse = await fetch(url, {
            ...options,
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
          });
          return retryResponse.json() as Promise<T>;
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Error refreshing token: ", error);
        
        throw new Error("Authentication failed. Please log in again.");
      }
    } else {
      redirect('/login'); 
      throw new Error("No refresh token available. Please log in again.");
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export default customServerFetch;
