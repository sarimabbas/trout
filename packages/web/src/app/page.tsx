import { OrganizationSwitcher, auth } from "@clerk/nextjs";
import { SourceList } from "../components/source-list";
import { Button } from "@sarim.garden/ui/client";
import { xata } from "@trout/xata";

export default async function Home() {
  const { orgId, userId } = auth();
  console.log({ orgId, userId });
  const lookupId = orgId ?? userId;

  const sources = await xata.db.sources
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .getAll();

  return (
    <div className="p-4 flex flex-col gap-8">
      <OrganizationSwitcher />
      <Button>Hello</Button>
      <SourceList sources={sources} />
    </div>
  );
}
