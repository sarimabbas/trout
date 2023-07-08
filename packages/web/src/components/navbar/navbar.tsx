"use client";

import { NavigationLinks } from "@/app/_utils/isomorphic";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  Badge,
  Button,
  DarkModeToggle,
  useTheme,
} from "@sarim.garden/ui/client";
import Link from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div className="container flex items-center justify-between gap-4 p-8 mx-auto bg-gray-50 dark:bg-zinc-900">
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className="flex items-start gap-2 text-2xl font-semibold"
        >
          <span>🐟 Trout</span>
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
