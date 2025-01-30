import { cookies } from "next/headers";
import customServerFetch from "./custom_fetch_server";

export const get_token = async () => {
  const response = await fetch("http://localhost:3000/api/get_token", {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  return await response.json();
};
export interface UserInterface { 
  id: number, 
  name: string, 
  phone_number: string, 
  role: number, 
  avatar: string, 
  email: string
} 
export async function fetchUserDataFromServer() {
  
  const response: UserInterface = await customServerFetch(
    "http://127.0.0.1:8000/api/user-info/",
    "GET",
    undefined,
    { cache: "no-cache" }
  );
  return response
}

