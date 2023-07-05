import { SinksSection } from "@/components/sinks";
import {
  createSource,
  deleteSource,
  editSource,
  getSources,
} from "../_actions";

export default async function AccessTokensPage() {
  const sources = await getSources();

  return (
    <div className="flex flex-col gap-8">
      <SinksSection
        sources={sources}
        createSource={createSource}
        editSource={editSource}
        deleteSource={deleteSource}
      />
    </div>
  );
}
