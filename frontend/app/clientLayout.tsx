'use client'; 

// import { headers } from "next/headers";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ChatComponent from "./components/chatComponent/Chat";
import { usePathname } from "next/navigation";

export default  function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const headersList = await headers();
  // const referer = headersList.get("referer");
  // const currentUrl = referer ? new URL(referer) : null;
  // const pathname = currentUrl?.pathname || "/";
  const pathname = usePathname();

  console.log("path: ", pathname);


  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  else if (pathname === "/") {
    return (
      <>
        {children}
        <Footer />
        <ChatComponent />
      </>
    );
  }

  else {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
        <ChatComponent />
      </>
    );
  }
}
