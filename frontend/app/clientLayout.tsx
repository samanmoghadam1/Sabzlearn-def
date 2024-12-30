"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ChatComponent from "./components/chatComponent/Chat";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login" || "signup") {
    return <>{children}</>
  }


  if (pathname === "/") {
    return <>{children}
      <Footer />
      <ChatComponent />
    </>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatComponent />
    </>
  );
}
