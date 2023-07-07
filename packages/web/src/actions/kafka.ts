import { getPrivateEnv } from "@trout/shared/isomorphic";
import { Kafka } from "kafkajs";

const privateEnv = getPrivateEnv();

const kafka = new Kafka({
  brokers: [privateEnv.KAFKA_BROKER],
  sasl: {
    mechanism: "scram-sha-256",
    username: privateEnv.KAFKA_USERNAME,
    password: privateEnv.KAFKA_PASSWORD,
  },
  ssl: true,
});

export const kafkaAdmin = kafka.admin();

export const kafkaProducer = kafka.producer({
  // not supported by Upstash yet, so we need to use createTopic
  // allowAutoTopicCreation: true,
});

export const createKafkaTopic = async (topic: string) => {
  await kafkaAdmin.connect();
  const isSuccess = await kafkaAdmin.createTopics({
    topics: [{ topic }],
  });
  await kafkaAdmin.disconnect();
  return isSuccess;
};

export const deleteKafkaTopic = async (topic: string) => {
  await kafkaAdmin.connect();
  await kafkaAdmin.deleteTopics({
    topics: [topic],
  });
  await kafkaAdmin.disconnect();
};

// -----------

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
