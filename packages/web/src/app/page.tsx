import { OrganizationSwitcher, UserButton, auth } from "@clerk/nextjs";
import { xata } from "@trout/xata";
import { SourceList } from "../components/source-list";

export default async function Home() {
  const { orgId, userId } = auth();
  console.log({ orgId, userId });
  const lookupId = orgId ?? userId;

  console.log({ lookupId });

  const sources = await xata.db.sources
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .select(["*"])
    .getAll();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-12">
          <div className="text-2xl font-semibold">🐟 Trout</div>
          <OrganizationSwitcher />
        </div>
        <UserButton />
      </div>
      <SourceList sources={sources} />
    </div>
  );
}
