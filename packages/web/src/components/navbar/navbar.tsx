import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-12">
          <div className="text-2xl font-semibold">🐟 Trout</div>
          <OrganizationSwitcher />
        </div>
        <UserButton />
      </div>
      <hr />
    </div>
  );
};
