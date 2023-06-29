import { xata } from "@trout/shared";
import { env } from "@/env.mjs";

interface CreateCredentialsResponse {
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

/**
 * Creates Kafka credentials for an access token
 * Gives access to all topics prefixed with the orgOrUserId
 * @param orgOrUserId
 */
export const getKafkaCredentialsForAccessToken = async (
  accessToken: string
) => {
  // get user from accessToken
  const accessTokenRecord = await xata.db.accessTokens
    .filter({ id: accessToken })
    .getFirst();
  if (!accessTokenRecord) {
    console.log("Invalid accessToken", accessToken);
    return;
  }

  // check if credentials already exist
  const foundCredentialsRecord = await xata.db.kafkaCredentials
    .filter({
      "accessToken.id": accessTokenRecord.id,
    })
    .getFirst();
  if (foundCredentialsRecord) {
    return foundCredentialsRecord;
  }

  // create credentials with upstash
  const response = await fetch("https://api.upstash.com/v2/kafka/credential", {
    method: "POST",
    body: JSON.stringify({
      credential_name: accessTokenRecord.id,
      cluster_id: env.KAFKA_CLUSTER_ID,
      topic: `${accessTokenRecord.clerkOrgOrUserId}/*`,
      permissions: "CONSUME",
    }),
    headers: {
      Authorization:
        "Basic " +
        btoa(env.UPSTASH_ADMIN_EMAIL + ":" + env.UPSTASH_ADMIN_API_KEY),
    },
  });
  const data: CreateCredentialsResponse = await response.json();

  // create credentials record
  const createdCredentialsRecord = await xata.db.kafkaCredentials.create({
    accessToken: {
      id: accessTokenRecord.id,
    },
    username: data.username,
    password: data.password,
  });

  return createdCredentialsRecord;
};
