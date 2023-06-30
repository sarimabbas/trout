import { SourceList } from "../components/source-list";
import { createSource, deleteSource, editSource, getSources } from "./_actions";
import { Navbar } from "@/components/navbar/navbar";

export default async function Home() {
  const sources = await getSources();

  return (
    <div className="flex flex-col gap-8">
      <Navbar />
      <SourceList
        sources={sources}
        createSource={createSource}
        editSource={editSource}
        deleteSource={deleteSource}
      />
    </div>
  );
}
