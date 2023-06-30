import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="container flex items-center justify-between gap-4 p-8 mx-auto bg-gray-50">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-semibold">🐟 Trout</div>
        <OrganizationSwitcher />
      </div>
      <UserButton />
    </div>
  );
};
