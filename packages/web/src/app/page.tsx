import { OrganizationSwitcher, auth } from "@clerk/nextjs";
import { SourceList } from "../components/source-list";

export default function Home() {
  const { orgId, userId } = auth();
  console.log({ orgId, userId });
  const clerkId = orgId ?? userId;

  return (
    <div className="p-4 flex flex-col gap-8">
      <OrganizationSwitcher />
      <SourceList />
    </div>
  );
}
