import { SourceList } from "../components/source-list";
import {
  createSource,
  deleteSource,
  editSource,
  getSources,
} from "../actions/sources";

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
    </div>
  );
}
