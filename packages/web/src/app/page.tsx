import { OrganizationSwitcher, UserButton, auth } from "@clerk/nextjs";
import { xata } from "@trout/xata";
import { SourceList } from "../components/source-list";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const { orgId, userId } = auth();
  console.log({ orgId, userId });
  const lookupId = orgId ?? userId;

  const sources = await xata.db.sources
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .select(["*"])
    .getAll();

  const createSource = async (formData: FormData) => {
    "use server";

    if (!lookupId) {
      throw new Error("lookupId is not defined");
    }

    if (!formData.get("name")) {
      throw new Error("name is not defined");
    }

    await xata.db.sources.create({
      name: formData.get("name") as string,
      clerkOrgOrUserId: lookupId,
    });

    revalidatePath("/");
  };

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
      <SourceList sources={sources} createSource={createSource} />
    </div>
  );
}
