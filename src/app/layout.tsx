import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/context/ThemeContext";
import { siteConfig, defaultOpenGraph, defaultTwitter } from "@/lib/seo/metadata.config";
import StructuredData from "@/components/seo/structured-data";
import {
  getWebsiteSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo/structured-data";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "RepoVision Team" }],
  creator: "RepoVision",
  openGraph: {
    ...defaultOpenGraph,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    ...defaultTwitter,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <StructuredData data={getWebsiteSchema()} />
        <StructuredData data={getOrganizationSchema()} />
        <StructuredData data={getSoftwareApplicationSchema()} />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
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
