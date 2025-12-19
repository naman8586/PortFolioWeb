import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Naman Soni — Full-Stack Developer",
  description:
    "Portfolio of Naman Soni — Full-Stack Developer specializing in Next.js, React, Three.js, and modern web technologies.",
  keywords: [
    "Naman Soni",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Three.js",
    "Portfolio",
  ],
  authors: [{ name: "Naman Soni" }],
  openGraph: {
    title: "Naman Soni Portfolio",
    description:
      "Full-Stack Developer specializing in Next.js, React, and cinematic web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-white`}
      >
        {children}
      </body>
    </html>
  );
}
