import type {
  SelectedPick,
  KafkaCredentialsRecord,
} from "@trout/shared/server";

export type IAPICredentialsResponse = SelectedPick<
  KafkaCredentialsRecord,
  ("*" | "accessToken.*")[]
>;

export const getCredentialsFromAPI = async (
  accessToken: string
): Promise<IAPICredentialsResponse> => {
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
