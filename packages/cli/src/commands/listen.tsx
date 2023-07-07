import { getTopicId } from "@trout/shared/isomorphic";
import { AccessTokensRecord } from "@trout/shared/server";
import { Text } from "ink";
import { Kafka } from "kafkajs";
import { useCallback, useEffect, useState } from "react";
import zod from "zod";
import { getAccessTokenDetails } from "../utils";

export const options = zod.object({
  sourceId: zod.string().describe("Source ID"),
  accessToken: zod.string().describe("Access token"),
});

type Props = {
  options: zod.infer<typeof options>;
};

export default function Listen({ options }: Props) {
  const [accessToken, setAccessToken] = useState<AccessTokensRecord>();

  const setAccessTokenDetails = useCallback(async () => {
    const accessToken = await getAccessTokenDetails(options.accessToken);
    if (
      !accessToken?.clerkOrgOrUserId ||
      !accessToken?.kafkaCredentialUsername ||
      !accessToken?.kafkaCredentialPassword
    ) {
      throw new Error("Access token credentials incomplete");
    }
    setAccessToken(accessToken);
  }, [options.accessToken]);

  const subscribeConsumerToTopic = useCallback(async () => {
    if (!options.sourceId || !accessToken) {
      return;
    }
    const consumer = createKafkaConsumer(accessToken);
    if (!consumer) {
      return;
    }

    console.log("Connecting consumer...");
    await consumer.connect();

    console.log("Subscribing consumer to topic: ", options.sourceId);
    await consumer.subscribe({
      topic: getTopicId(accessToken?.clerkOrgOrUserId!, options.sourceId),
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
  }, [options.sourceId, accessToken]);

  useEffect(() => {
    setAccessTokenDetails();
  }, [setAccessTokenDetails]);

  useEffect(() => {
    subscribeConsumerToTopic();
  }, [subscribeConsumerToTopic]);

  return (
    <Text>
      Hello, <Text color="green">{JSON.stringify(accessToken)}</Text>
    </Text>
  );
}

const createKafkaConsumer = (accessToken: AccessTokensRecord) => {
  if (
    !accessToken?.clerkOrgOrUserId ||
    !accessToken?.kafkaCredentialUsername ||
    !accessToken?.kafkaCredentialPassword
  ) {
    return;
  }

  console.log({
    "creating with credentials": accessToken,
  });

  const kafka = new Kafka({
    brokers: ["cheerful-perch-5591-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username: accessToken.kafkaCredentialUsername,
      password: accessToken.kafkaCredentialPassword,
    },
    ssl: true,
  });
  const consumer = kafka.consumer({
    groupId: accessToken.clerkOrgOrUserId,
  });
  return consumer;
};
