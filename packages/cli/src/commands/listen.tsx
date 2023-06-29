import { Text } from "ink";
import zod from "zod";
import { Kafka } from "kafkajs";

export const options = zod.object({
  sourceId: zod.string().describe("Source ID"),
  accessToken: zod.string().describe("Access token"),
});

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!],
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  ssl: true,
});

const admin = kafka.admin();

const producer = kafka.producer({
  // not supported by Upstash yet, so we need to use createTopic
  // allowAutoTopicCreation: true,
});

type Props = {
  options: zod.infer<typeof options>;
};

export default function Listen({ options }: Props) {
  return (
    <Text>
      Hello, <Text color="green">{options.accessToken}</Text>
    </Text>
  );
}
