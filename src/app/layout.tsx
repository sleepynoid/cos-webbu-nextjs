import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cosulagi | Cosplay Marketplace Indonesia",
  description: "Platform rental dan jual beli kostum cosplay terpercaya di Indonesia.",
};

import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} antialiased`}>
        <div className="min-h-screen bg-[#F8F9FA]">
          <Navbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
