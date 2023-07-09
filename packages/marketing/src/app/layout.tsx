import "./globals.css";
import "@sarim.garden/ui/css";
import type { Metadata } from "next";
import { Bungee, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trout",
  description: "Easy webhook development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
