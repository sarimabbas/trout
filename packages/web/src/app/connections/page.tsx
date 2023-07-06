import { ConnectionsSection } from "@/components/connections";
import * as sourceActions from "@/actions/sources";
import * as sinkActions from "@/actions/sinks";
import * as connectionActions from "@/actions/connections";
import "reactflow/dist/style.css";

export default async function ConnectionsPage() {
  const sources = await sourceActions.READ();
  const sinks = await sinkActions.READ();
  const connections = await connectionActions.READ();
  return (
    <div className="flex flex-col h-full gap-8">
      <ConnectionsSection
        sources={sources}
        sinks={sinks}
        connections={connections}
      />
    </div>
  );
}
