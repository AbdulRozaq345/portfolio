import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Catchy title with your 3 main keywords
  title: "NexxxaCodeID | Web Developer, SEO Expert & Website Maintenance",
  description:
    "NexxxaCodeID provides agency-level Web Development, professional SEO optimization, and reliable Website Maintenance services. High-performance digital solutions built for scale.",
  keywords: [
    "Web Developer",
    "SEO Expert",
    "Website Maintenance Services",
    "NexxxaCodeID Portfolio",
    "Fullstack Developer",
    "Performance Optimization",
    "Next.js Development Agency",
  ],
  authors: [{ name: "NexxxaCodeID" }],
  creator: "NexxxaCodeID",

  // Social Media Preview (Open Graph)
  openGraph: {
    title: "NexxxaCodeID - Web Developer, SEO & Maintenance",
    description:
      "Complete digital solutions: From building high-speed websites to SEO and routine maintenance. Check our portfolio!",
    url: "https://nexxacodeid.site",
    siteName: "NexxxaCodeID",
    images: [
      {
        url: "/og-image.jpg", // Make sure this 1200x630px file is in your /public folder!
        width: 1200,
        height: 630,
        alt: "NexxxaCodeID - Web Development, SEO & Maintenance Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter/X Preview
  twitter: {
    card: "summary_large_image",
    title: "NexxxaCodeID | Web Dev & SEO Solutions",
    description:
      "Expert Web Developer, SEO, and Website Maintenance services for your business.",
    images: ["/og-image.jpg"],
  },

  // Indexing for Google
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
