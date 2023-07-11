import { Navbar } from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster, ThemeProvider } from "@sarim.garden/ui/client";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "@sarim.garden/ui/css";
import { Inter } from "next/font/google";

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
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {/* container should NOT be body, otherwise this happens https://github.com/radix-ui/primitives/discussions/2101 */}
            <div className="container flex flex-col gap-8 p-4 mx-auto md:p-8">
              <Navbar />
              {children}
            </div>
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
