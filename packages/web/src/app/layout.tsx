import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@sarim.garden/ui/client";
import "@sarim.garden/ui/css";
import { cn } from "@sarim.garden/ui/isomorphic";
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
          {/* container should NOT be body, otherwise this happens https://github.com/radix-ui/primitives/discussions/2101 */}
          <div className="mx-auto container p-4 md:p-8">{children}</div>
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
