"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-4 flex gap-8">
      <OrganizationSwitcher hidePersonal />
    </div>
  );
}
