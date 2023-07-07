import { kafkaProducer } from "@/actions/kafka";
import { serializeRequest } from "@/app/_utils/isomorphic";
import { getTopicId } from "@trout/shared/isomorphic";
import { xata } from "@trout/shared/server";
import { type NextRequest } from "next/server";

// receives webhook requests from external sources and 1) forwards them to Kafka
// for CLI and 2) forwards them to all connections
const handler = async (
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

  // send to CLI
  await kafkaProducer.connect();
  await kafkaProducer.send({
    topic: getTopicId(source.clerkOrgOrUserId, source.id),
    messages: [{ value: serializedRequest }],
  });
  await kafkaProducer.disconnect();

  // todo(sarim): send to all connections

  return new Response(params.sourceId);
};

export const POST = handler;
export const GET = handler;
