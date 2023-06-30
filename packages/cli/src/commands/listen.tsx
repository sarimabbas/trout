import { Text } from "ink";
import { useCallback, useEffect, useState } from "react";
import zod from "zod";
import { IAPICredentialsResponse, getCredentialsFromAPI } from "../utils";
import { Kafka } from "kafkajs";
import { getTopicId } from "@trout/shared/isomorphic";

export const options = zod.object({
  sourceId: zod.string().describe("Source ID"),
  accessToken: zod.string().describe("Access token"),
});

type Props = {
  options: zod.infer<typeof options>;
};

const createKafkaConsumer = (credentials: IAPICredentialsResponse) => {
  if (
    !credentials?.username ||
    !credentials?.password ||
    !credentials.accessToken?.clerkOrgOrUserId
  ) {
    return;
  }

  console.log({
    "creating with credentials": credentials,
  });

  const kafka = new Kafka({
    brokers: ["cheerful-perch-5591-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username: credentials.username,
      password: credentials.password,
    },
    ssl: true,
  });
  const consumer = kafka.consumer({
    groupId: credentials.accessToken.clerkOrgOrUserId,
  });
  return consumer;
};

export default function Listen({ options }: Props) {
  const [credentials, setCredentials] = useState<IAPICredentialsResponse>();

  const getCredentials = useCallback(async () => {
    const credentials = await getCredentialsFromAPI(options.accessToken);
    if (
      !credentials.accessToken?.clerkOrgOrUserId ||
      !credentials.username ||
      !credentials.password
    ) {
      throw new Error("Credentials incomplete");
    }
    setCredentials(credentials);
  }, [options.accessToken]);

  const subscribeConsumerToTopic = useCallback(async () => {
    if (!options.sourceId || !credentials) {
      return;
    }
    const consumer = createKafkaConsumer(credentials);
    if (!consumer) {
      return;
    }

    console.log("Connecting consumer...");
    await consumer.connect();

    console.log("Subscribing consumer to topic: ", options.sourceId);
    await consumer.subscribe({
      topic: getTopicId(
        credentials.accessToken?.clerkOrgOrUserId!,
        options.sourceId
      ),
    });

    console.log("Listening for messages...");

    // this will block forever
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });
      },
    });

    return async () => {
      console.log("Disconnecting consumer...");
      await consumer.disconnect();
    };
  }, [options.sourceId, credentials]);

  useEffect(() => {
    getCredentials();
  }, [getCredentials]);

  useEffect(() => {
    subscribeConsumerToTopic();
  }, [subscribeConsumerToTopic]);

  return (
    <Text>
      Hello, <Text color="green">{JSON.stringify(credentials)}</Text>
    </Text>
  );
}
