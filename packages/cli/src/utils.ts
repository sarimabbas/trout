import type { SelectedPick, KafkaCredentialsRecord } from "@trout/shared";

export type IApiCredentialsResponse = Readonly<
  SelectedPick<KafkaCredentialsRecord, ["*"]>
>;

export const getCredentialsForAccessToken = async (
  accessToken: string
): Promise<IApiCredentialsResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/credentials",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken }),
    }
  );
  return response.json();
};
