import { cookies } from "next/headers";

export const get_token = async()=>{
    const response = await fetch('http://localhost:3000/api/get_token', {
      headers: {
        Cookie: (await cookies()).toString()
      } 
    }); 
    return await response.json() ; 
  }
