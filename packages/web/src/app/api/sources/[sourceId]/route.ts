import { deserializeRequest, serializeRequest } from "@/app/_utils";
import { env } from "@/env.mjs";
import { xata } from "@trout/xata";
import { Kafka } from "kafkajs";
import { type NextRequest } from "next/server";

const kafka = new Kafka({
  brokers: [env.KAFKA_BROKER],
  sasl: {
    mechanism: "scram-sha-256",
    username: env.KAFKA_USERNAME,
    password: env.KAFKA_PASSWORD,
  },
  ssl: true,
});

const admin = kafka.admin();

const producer = kafka.producer({
  // not supported by Upstash yet, so we need to use createTopic
  // allowAutoTopicCreation: true,
});

export const GET = async (
  req: NextRequest,
  { params }: { params: { sourceId: string } }
) => {
  // check source exists
  const source = await xata.db.sources
    .filter({ id: params.sourceId })
    .getFirst();
  if (!source) {
    return new Response("Not found", { status: 404 });
  }

  // create topic if it doesn't exist
  // the userID is used as a topic prefix
  await createTopic(`${source.clerkOrgOrUserId}/${source.id}`);

  const serializedRequest = serializeRequest(req);
  console.log("serializedRequest", serializedRequest);

  const deserializedRequest = deserializeRequest(serializedRequest);
  console.log("deserializedRequest", deserializedRequest);

  await producer.connect();
  await producer.send({
    topic: params.sourceId,
    messages: [{ value: serializedRequest }],
  });
  await producer.disconnect();

  return new Response(params.sourceId);
};

export const createTopic = async (topic: string) => {
  await admin.connect();
  const isSuccess = await admin.createTopics({
    topics: [{ topic }],
  });
  await admin.disconnect();
  return isSuccess;
};
