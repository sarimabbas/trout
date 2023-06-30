import { Navbar } from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@sarim.garden/ui/client";
import "@sarim.garden/ui/css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trout",
  description: "Local webhooks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {/* container should NOT be body, otherwise this happens https://github.com/radix-ui/primitives/discussions/2101 */}
          <div className="container p-8 mx-auto">{children}</div>
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
