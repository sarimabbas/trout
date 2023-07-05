import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Button } from "@sarim.garden/ui/client";
import Link from "next/link";

const links = [
  {
    href: "/",
    label: "Sources",
  },
  {
    href: "/sinks",
    label: "Sinks",
  },
  {
    href: "/connections",
    label: "Connections",
  },
  {
    href: "/access-tokens",
    label: "Access tokens",
  },
];

export const Navbar = () => {
  return (
    <div className="container flex items-center justify-between gap-4 p-8 mx-auto bg-gray-50">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-semibold">🐟 Trout</div>
        <OrganizationSwitcher />
        <ul className="flex items-center gap-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>
                <Button variant="link">{label}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <UserButton />
    </div>
  );
};
