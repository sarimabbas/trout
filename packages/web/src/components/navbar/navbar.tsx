import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Button } from "@sarim.garden/ui/client";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="container flex items-center justify-between gap-4 p-8 mx-auto bg-gray-50">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-semibold">🐟 Trout</div>
        <OrganizationSwitcher />
        <ul className="flex items-center gap-4">
          <Link href="/">
            <Button variant="link">Sources</Button>
          </Link>
          <Link href="/access-tokens">
            <Button variant="link">Access tokens</Button>
          </Link>
        </ul>
      </div>
      <UserButton />
    </div>
  );
};
