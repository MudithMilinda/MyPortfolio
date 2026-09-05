import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Mudith Milinda — Software Engineer",
  description:
    "Software Engineer building responsive, scalable full-stack web applications and AI-powered solutions with React.js, Next.js, Node.js, and MongoDB.",
    icons: {
    icon: "/images/logo.png", // public folder එකේ හෝ app folder එකේ ඇති path එක දෙන්න
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
