import { getPrivateEnv } from "@trout/shared/isomorphic";

const privateEnv = getPrivateEnv();

interface UpstashCreateCredentialsResponse {
  credential_id: string;
  credential_name: string;
  topic: string;
  permissions: string;
  cluster_id: string;
  cluster_slug: string;
  username: string;
  creation_time: number;
  password: string;
  state: string;
}

export const CREATE = async (
  accessTokenValue: string,
  clerkOrgOrUserId: string
) => {
  const response = await fetch("https://api.upstash.com/v2/kafka/credential", {
    method: "POST",
    body: JSON.stringify({
      cluster_id: privateEnv.KAFKA_CLUSTER_ID,
      permissions: "ALL",
      credential_name: accessTokenValue,
      topic: `${clerkOrgOrUserId}.*`, // allow access to all topics for the clerk org or user
    }),
    headers: {
      Authorization:
        "Basic " +
        btoa(
          privateEnv.UPSTASH_ADMIN_EMAIL +
            ":" +
            privateEnv.UPSTASH_ADMIN_API_KEY
        ),
    },
  });
  const data: UpstashCreateCredentialsResponse = await response.json();
  return data;
};

export const DELETE = async (kafkaCredentialId: string) => {
  const response = await fetch(
    `https://api.upstash.com/v2/kafka/credential/${kafkaCredentialId}`,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            privateEnv.UPSTASH_ADMIN_EMAIL +
              ":" +
              privateEnv.UPSTASH_ADMIN_API_KEY
          ),
      },
    }
  );
  const data: any = await response.json();
  return data;
};
