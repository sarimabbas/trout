import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { SourceList } from "../components/source-list";
import { createSource, deleteSource, editSource, getSources } from "./_actions";

export default async function Home() {
  const sources = await getSources();

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
      <SourceList
        sources={sources}
        createSource={createSource}
        editSource={editSource}
        deleteSource={deleteSource}
      />
    </div>
  );
}
