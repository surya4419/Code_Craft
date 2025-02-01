import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../components/Footer";
import ConvexClientProvider from "../components/providers/ConvexClientProvider"; // Corrected import
import { Toaster } from 'react-hot-toast'; // Import Toaster

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Code Craft",
  description: "Share and run code snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex-col`}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster /> {/* Add Toaster here */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
