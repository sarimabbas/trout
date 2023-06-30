import { deserializeRequest, serializeRequest } from "@/app/_utils/isomorphic";
import { getPrivateEnv, getTopicId } from "@trout/shared/isomorphic";
import { xata } from "@trout/shared/server";
import { Kafka } from "kafkajs";
import { type NextRequest } from "next/server";

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

  const serializedRequest = serializeRequest(req);
  console.log("serializedRequest", serializedRequest);

  const deserializedRequest = deserializeRequest(serializedRequest);
  console.log("deserializedRequest", deserializedRequest);

  await producer.connect();
  await producer.send({
    topic: getTopicId(source.clerkOrgOrUserId, source.id),
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

export const deleteTopic = async (topic: string) => {
  await admin.connect();
  await admin.deleteTopics({
    topics: [topic],
  });
  await admin.disconnect();
};
