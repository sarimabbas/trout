import { pusher } from "@/actions/pusher";
import { serializeRequest } from "@/app/_utils/isomorphic";
import { defaultPusherChannel } from "@trout/shared/isomorphic";
import { xata } from "@trout/shared/server";
import { NextResponse, type NextRequest } from "next/server";

// receives webhook requests from external sources and 1) forwards them to CLI
// and 2) forwards them to all connections
const handler = async (
  originalReq: NextRequest,
  { params }: { params: { webhookToken: string } }
) => {
  // check source exists
  const source = await xata.db.sources
    .filter({ webhookToken: params.webhookToken })
    .getFirst();
  if (!source) {
    return NextResponse.json({ error: "Source not found" }, { status: 404 });
  }

  // send to CLI
  const clonedReqForCLI = originalReq.clone();
  const serializedRequest = serializeRequest(clonedReqForCLI);
  await pusher.trigger(source.id, defaultPusherChannel, serializedRequest);

  // send to all sinks
  const connections = await xata.db.connections
    .filter({
      source: {
        id: source.id,
      },
    })
    .select(["*", "sink.*"])
    .getAll();

  await Promise.all(
    connections
      .filter((c) => !!c.sink.url)
      .map((connection) => {
        // remove bad headers from request
        const clonedReq = originalReq.clone();
        clonedReq.headers.delete("host");

        // add query params from source to sink
        const reqUrl = new URL(clonedReq.url);
        const nextUrl = new URL(connection.sink.url);
        reqUrl.searchParams.forEach((value, key) => {
          nextUrl.searchParams.set(key, value);
        });

        return fetch(`${process.env.QSTASH_URL}${nextUrl.toString()}`, {
          method: clonedReq.method,
          body: clonedReq.body,
          cache: clonedReq.cache,
          credentials: clonedReq.credentials,
          headers: {
            ...Object.fromEntries(clonedReq.headers.entries()),
            Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
          },
          integrity: clonedReq.integrity,
          keepalive: clonedReq.keepalive,
          mode: clonedReq.mode,
          redirect: clonedReq.redirect,
          referrer: clonedReq.referrer,
          referrerPolicy: clonedReq.referrerPolicy,
          // https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1483
          // @ts-ignore
          duplex: "half",
        });
      })
  );

  return NextResponse.json({ success: true });
};

export const POST = handler;
export const GET = handler;
