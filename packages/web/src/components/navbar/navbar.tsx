"use client";

import { NavigationLinks } from "@/app/_utils/isomorphic";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  Badge,
  Button,
  DarkModeToggle,
  TypographyH3,
  useTheme,
} from "@sarim.garden/ui/client";
import { cn } from "@sarim.garden/ui/isomorphic";
import { Bungee } from "next/font/google";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between gap-4 p-8 bg-white border-4 border-blue-200 shadow-sm dark:bg-zinc-900 rounded-xl">
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className="flex items-start gap-2 text-2xl font-semibold"
        >
          <TypographyH3 className={cn(bungee.className, "m-0 text-blue-500")}>
            🐟 Trout
          </TypographyH3>
          <Badge>BETA</Badge>
        </Link>
        <OrganizationSwitcher
          appearance={theme === "dark" ? { baseTheme: dark } : {}}
        />
        <ul className="flex items-center gap-4">
          {NavigationLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>
                <Button variant="link">{label}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-12">
        <DarkModeToggle />
        <UserButton appearance={theme === "dark" ? { baseTheme: dark } : {}} />
      </div>
    </div>
  );
};
