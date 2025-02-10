'use client'; 

import Cookies from "js-cookie";
import { redirect } from "next/navigation"

const LogoutPage = () => {
    Cookies.remove('accessToken'); 
    Cookies.remove('refreshToken'); 
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 

    redirect('login'); 
}
 
export default LogoutPage;