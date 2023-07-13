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
import { logEvent } from "@trout.run/shared/client";
import { Bungee } from "next/font/google";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-white border-4 border-blue-200 shadow-sm md:justify-between dark:bg-zinc-900 rounded-xl">
      {/* left */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:justify-between">
        <Link
          href="/"
          className="flex items-start gap-2 text-2xl font-semibold"
        >
          <TypographyH3 className={cn(bungee.className, "m-0 text-blue-500")}>
            🐟 Trout
          </TypographyH3>
          <Badge>BETA</Badge>
        </Link>
        <ul className="flex items-center gap-8 md:justify-between">
          {NavigationLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => {
                  logEvent("link_click", { href, label });
                }}
              >
                <Button variant="link" className="p-0">
                  {label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* right */}
      <div className="flex items-center gap-12">
        <DarkModeToggle />
        <OrganizationSwitcher
          appearance={theme !== "light" ? { baseTheme: dark } : {}}
        />
        <UserButton appearance={theme !== "light" ? { baseTheme: dark } : {}} />
      </div>
    </div>
  );
};
