'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import { RecoilRoot } from "recoil";
import { Toaster } from 'react-hot-toast';
import AppFooter from "@/components/AppFooter";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Eloria</title>
        <meta name="description" content="Shop the latest collections at Dania" />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <RecoilRoot>
          <AppHeader />
        {children}
        <AppFooter />
        <Toaster position="bottom-center" />
        
        </RecoilRoot>
      </body>
    </html>
  );
}
