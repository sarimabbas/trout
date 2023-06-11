import "@sarim.garden/ui/css";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@sarim.garden/ui/isomorphic";

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
        <body className={cn(inter.className, "mx-auto container")}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
