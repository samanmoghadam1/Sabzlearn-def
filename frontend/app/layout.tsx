// "use client"

// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./globals.css";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import ChatComponent from "./components/chatComponent/Chat";

// const iranFont = localFont({ src: "../public/fonts/Vazirmatn-Regular.ttf" });

// export const metadata: Metadata = {
//   title: "Home Page",
//   description: "This is the home page baby",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html dir="rtl" lang="fa">
//       <head>
//         {/* لینک‌های Font Awesome */}
//         <link
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
//           rel="stylesheet"
//         />
//         <link
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
//           rel="stylesheet"
//         />

//         <link
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/fontawesome.min.css"
//           rel="stylesheet"
//         />
//       </head>
//       <body className={iranFont.className}>
//         <Navbar />
//         {children}
//         <Footer />
//         <ChatComponent />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ClientLayout from "./clientLayout";

const iranFont = localFont({ src: "../public/fonts/Vazirmatn-Regular.ttf" });

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page baby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/fontawesome.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={iranFont.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
