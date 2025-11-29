import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RepoVision - Discover GitHub Projects",
  description:
    "Explore trending GitHub repositories, discover talented developers, and find amazing open-source projects with advanced search and analytics.",
  keywords: [
    "GitHub",
    "repositories",
    "developers",
    "open source",
    "trending",
    "analytics",
  ],
  authors: [{ name: "RepoVision" }],
  openGraph: {
    title: "RepoVision - Discover GitHub Projects",
    description:
      "Explore trending GitHub repositories and discover talented developers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="repovision-theme">
          <NextTopLoader color="#0070F3" height={2} showSpinner={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
