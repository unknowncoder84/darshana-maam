import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ToastProvider } from "@/lib/contexts/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Law Firm - Professional Legal Services",
    template: "%s | Law Firm"
  },
  description: "Expert legal services and counsel for your needs. Professional attorneys providing comprehensive legal representation across multiple practice areas.",
  keywords: ['law firm', 'legal services', 'attorney', 'lawyer', 'legal counsel'],
  authors: [{ name: 'Law Firm' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Law Firm',
    title: 'Law Firm - Professional Legal Services',
    description: 'Expert legal services and counsel for your needs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
