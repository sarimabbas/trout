import { OrganizationSwitcher, auth } from "@clerk/nextjs";
import { SourceList } from "../components/source-list";
import { Button } from "@sarim.garden/ui/client";

export default function Home() {
  const { orgId, userId } = auth();
  console.log({ orgId, userId });
  const clerkId = orgId ?? userId;

  return (
    <div className="p-4 flex flex-col gap-8">
      <OrganizationSwitcher />
      <Button>Hello</Button>
      <SourceList />
    </div>
  );
}
