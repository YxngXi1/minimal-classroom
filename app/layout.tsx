import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NameCard from "@/components/NameCard";
import PageEnd from "@/components/PageEnd";
import SessionWrapper from "@/utils/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minimal Classroom",
  description: "Made by Yang Xue, with blood, sweat, and tears.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper> 
      <html lang="en">
        <body className={inter.className}>
            <Navbar/>
            <div className="lg:flex lg:m-4">
              <div className="w-1/3 hide-on-mobile">
                <NameCard />  
              </div>
              <div className="lg:w-2/3 lg:mt-16">
                {children}
                <PageEnd/>
              </div>
            </div>
        </body>
      </html>
    </SessionWrapper>
  );
}