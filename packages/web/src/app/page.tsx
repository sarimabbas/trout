import { AccessTokensSection } from "@/components/access-token-section";
import { SourceList } from "../components/source-list";
import { createSource, deleteSource, editSource, getSources } from "./_actions";

export default async function Home() {
  const sources = await getSources();

  return (
    <div className="flex flex-col gap-8">
      <SourceList
        sources={sources}
        createSource={createSource}
        editSource={editSource}
        deleteSource={deleteSource}
      />
      <AccessTokensSection
        sources={sources}
        createSource={createSource}
        editSource={editSource}
        deleteSource={deleteSource}
      />
    </div>
  );
}
