import { Navbar } from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster, ThemeProvider } from "@sarim.garden/ui/client";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "@sarim.garden/ui/css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trout",
  description: "Local webhooks",
  icons:
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐟</text></svg>",
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
              <div className="flex gap-8 ">
                <div className="min-w-[200px] px-4">
                  <Sidebar />
                </div>
                <div className="border w-[1px]"></div>
                <div className="flex-1">{children}</div>
              </div>
            </div>
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
