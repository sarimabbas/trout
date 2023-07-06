import * as accessTokenActions from "@/actions/accessTokens";
import { AccessTokensSection } from "@/components/access-tokens";

export default async function AccessTokensPage() {
  const accessTokens = await accessTokenActions.READ();
  return (
    <div className="flex flex-col gap-8">
      <AccessTokensSection
        accessTokens={accessTokens}
        CREATE={accessTokenActions.CREATE}
        UPDATE={accessTokenActions.UPDATE}
        DELETE={accessTokenActions.DELETE}
      />
    </div>
  );
}
