import { AccessTokensSection } from "@/components/access-token-section";
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
      <AccessTokensSection
        sources={sources}
        createSource={createSource}
        editSource={editSource}
        deleteSource={deleteSource}
      />
    </div>
  );
}
