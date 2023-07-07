import type { AccessTokensRecord } from "@trout/shared/server";

export const getAccessTokenDetails = async (
  accessToken: string
): Promise<AccessTokensRecord> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/v0/access-tokens",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken }),
    }
  );
  return response.json();
};
