import { kafkaAdmin, kafkaProducer } from "@/actions/kafka";
import { deserializeRequest, serializeRequest } from "@/app/_utils/isomorphic";
import { getTopicId } from "@trout/shared/isomorphic";
import { xata } from "@trout/shared/server";
import { type NextRequest } from "next/server";

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

  await kafkaProducer.connect();
  await kafkaProducer.send({
    topic: getTopicId(source.clerkOrgOrUserId, source.id),
    messages: [{ value: serializedRequest }],
  });
  await kafkaProducer.disconnect();

  return new Response(params.sourceId);
};
