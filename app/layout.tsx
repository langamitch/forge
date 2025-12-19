import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local"; 
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const helveticaNeue = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
      
    },
    {
      path: "./fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueHeavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
});

const mestika = localFont({
  src: "./fonts/Mestika.otf",
  variable: "--font-mestika",
});

export const metadata: Metadata = {
  title: "A wards Weekly - Curated Website Inspiration",
  description: " Awebsite where user can upload their work for the public to see and get inspired. Weakly awards are given to the best website based on design, creativity, and usability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
         <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${helveticaNeue.variable} ${mestika.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
