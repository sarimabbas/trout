import { SinksSection } from "@/components/sinks";
import * as sinkActions from "@/actions/sinks";

export default async function SinksPage() {
  const sinks = await sinkActions.READ();

  return (
    <div className="flex flex-col gap-8">
      <SinksSection
        sinks={sinks}
        CREATE={sinkActions.CREATE}
        UPDATE={sinkActions.UPDATE}
        DELETE={sinkActions.DELETE}
      />
    </div>
  );
}
