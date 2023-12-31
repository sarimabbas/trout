"use client";

import { NavigationLinks } from "@/app/_utils/isomorphic";
import { Button, DarkModeToggle } from "@sarim.garden/ui/client";
import { logEvent } from "@trout.run/shared/client";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { MoreDropdown } from "../more-dropdown";

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* links */}
      <ul className="flex flex-col gap-4">
        {NavigationLinks.map(({ href, label, icon }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => logEvent("link_click", { href, label })}
            >
              <Button variant="outline" className="justify-start w-full gap-4">
                {icon}
                {label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
      {/* dark mode */}
      <div className="flex items-center self-end gap-4">
        <DarkModeToggle />
        <MoreDropdown />
      </div>
    </div>
  );
};
