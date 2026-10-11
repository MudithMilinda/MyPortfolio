import type { Metadata } from "next";
import { Italianno, Space_Grotesk } from "next/font/google";
import "./globals.css";

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const signature = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: "Mudith Milinda | Software Engineer",
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
      <body className={`${body.variable} ${signature.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
