import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ToastProvider } from "@/lib/contexts/ToastContext";

// Premium Editorial Fonts
const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Settle Here Law Associates - Expert Criminal & Administrative Law",
    template: "%s | Settle Here Law Associates"
  },
  description: "Premier legal defense in criminal and administrative law across India. Specialized in cyber crimes, drug crimes, financial crimes, deportation, and criminal trials. Expert representation when you need it most.",
  keywords: ['criminal law', 'administrative law', 'cyber crimes', 'drug crimes', 'financial crimes', 'deportation', 'bail', 'legal defense', 'India', 'law firm'],
  authors: [{ name: 'Settle Here Law Associates' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Settle Here Law Associates',
    title: 'Settle Here Law Associates - Expert Legal Defense',
    description: 'Premier legal defense in criminal and administrative law across India',
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
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
