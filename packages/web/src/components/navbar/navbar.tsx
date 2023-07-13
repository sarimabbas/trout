"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Badge, TypographyH3, useTheme } from "@sarim.garden/ui/client";
import { cn } from "@sarim.garden/ui/isomorphic";
import { Bungee } from "next/font/google";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-between gap-8 p-8 bg-white border-4 border-blue-200 shadow-md dark:border-sky-400 shadow-blue-50 dark:shadow-sky-800 dark:bg-zinc-900 rounded-xl">
      {/* left */}
      <div className="flex flex-wrap items-center gap-8">
        <Link
          href="/"
          className="flex items-start gap-2 text-2xl font-semibold"
        >
          <TypographyH3 className={cn(bungee.className, "m-0 text-blue-500")}>
            🐟 Trout
          </TypographyH3>
          <Badge>BETA</Badge>
        </Link>
      </div>
      {/* right */}
      <div className="flex items-center gap-12">
        <OrganizationSwitcher
          appearance={theme !== "light" ? { baseTheme: dark } : {}}
        />
        <UserButton appearance={theme !== "light" ? { baseTheme: dark } : {}} />
      </div>
    </div>
  );
};
