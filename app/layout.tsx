import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import { TenantProvider } from "@/app/contexts/TenantContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Makeup Artist in Bhadaura, Zamania & Ghazipur | Dulhan Beauty Parlour",
  description: "Looking for the best makeup artist in Bhadaura, Zamania, Dildarnagar or Ghazipur? Dulhan Beauty Parlour offers premium bridal makeup, luxury skincare, and expert hair styling for your special day.",
  keywords: "best makeup artist in Bhadaura, makeup artist in Zamania, Dildarnagar makeup artist, Ghazipur beauty salon, bridal makeup Ghazipur, Dulhan Beauty Parlour",
  authors: [{ name: "Dulhan Beauty Parlour" }],
  openGraph: {
    title: "Best Makeup Artist in Bhadaura, Zamania & Ghazipur | Dulhan Beauty Parlour",
    description: "Premium bridal makeup and luxury beauty services in Bhadaura, Zamania, Dildarnagar, and Ghazipur.",
    type: "website",
    url: "https://dulhanbeautyparlour.com",
    siteName: "Dulhan Beauty Parlour",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TenantProvider>
          <Header />
          <main className="min-h-screen pt-[104px]">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </TenantProvider>
      </body>
    </html>
  );
}
