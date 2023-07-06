import { SourcesSection } from "../components/sources";
import * as sourceActions from "@/actions/sources";

export default async function SourcesPage() {
  const sources = await sourceActions.READ();
  return (
    <div className="flex flex-col gap-8">
      <SourcesSection
        sources={sources}
        CREATE={sourceActions.CREATE}
        UPDATE={sourceActions.UPDATE}
        DELETE={sourceActions.DELETE}
      />
    </div>
  );
}
