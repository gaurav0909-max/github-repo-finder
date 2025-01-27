import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Find your resource 🔎",
  description:
    "A tool to search and explore GitHub users and repositories effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} antialiased`}>
        <NextTopLoader color="#FDF1DA" height={2} />
        {children}
      </body>
    </html>
  );
}
