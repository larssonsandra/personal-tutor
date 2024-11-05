import { ClerkProvider } from "@clerk/nextjs";
import { headers } from "next/headers"; // Add this import

import "./globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://clerk-next-app.vercel.app/"),
  title: "Next.js Clerk Template",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cspHeader = (await headers()).get("Content-Security-Policy");
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* <head>
        {cspHeader && (
          <meta httpEquiv="Content-Security-Policy" content={cspHeader} />
        )}
      </head> */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* @ts-ignore */}
      <ClerkProvider
        dynamic
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <body className={`min-h-screen flex flex-col antialiased`}>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </ClerkProvider>
      {/* </Suspense> */}
    </html>
  );
}
