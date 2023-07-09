import { pusher } from "@/actions/pusher";
import {
  defaultPusherChannel,
  requestProcessor,
} from "@trout.run/shared/isomorphic";
import { xata } from "@trout.run/shared/server";
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
  const serializedRequest = requestProcessor.serializeRequest(originalReq);
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
        // copy the request so we can modify it
        const clonedReq = originalReq.clone();

        // clean headers from source
        const cleanHeaders = requestProcessor.cleanHeaders(clonedReq.headers);

        // add query params from source to sink
        const nextUrl = requestProcessor.copyParamsToUrl(
          clonedReq.url,
          connection.sink.url
        );

        return fetch(`${process.env.QSTASH_URL}${nextUrl}`, {
          method: clonedReq.method,
          body: clonedReq.body,
          cache: clonedReq.cache,
          credentials: clonedReq.credentials,
          headers: {
            ...Object.fromEntries(cleanHeaders.entries()),
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
