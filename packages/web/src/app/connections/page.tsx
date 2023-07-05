import { ConnectionsSection } from "@/components/connections";
import "reactflow/dist/style.css";

export default async function ConnectionsPage() {
  return (
    <div className="flex flex-col h-full gap-8">
      <ConnectionsSection />
    </div>
  );
}
