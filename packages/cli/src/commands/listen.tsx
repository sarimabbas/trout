import {
  defaultPusherEventName,
  requestProcessor,
} from "@trout.run/shared/isomorphic";
import { SourcesRecord } from "@trout.run/shared/server";
import { consola } from "consola";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { pusherClient } from "../utils";

export const options = z.object({
  source: z.string().describe("CLI token for the source"),
  forward: z.string().url().describe("URL to forward events to"),
  verbose: z.boolean().optional().default(false),
});

type Props = {
  options: z.infer<typeof options>;
};

export default function Listen({ options }: Props) {
  const [source, setSource] = useState<SourcesRecord>();

  const getSource = useCallback(async () => {
    consola.start("Authenticating...");
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v0/cli-tokens",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliToken: options.source }),
      }
    );
    const source = await response.json();
    setSource(source);
  }, [options.source]);

  const listenForEvents = useCallback(async () => {
    if (!source?.id) {
      return;
    }

    consola.ready(`Listening for events on source "${source.name}"...`);

    const channel = pusherClient.subscribe(source.id);
    channel.bind(
      defaultPusherEventName,
      async (data: { serializedRequest: string }) => {
        consola.info("Received an event.");

        // deserialize request
        const requestInit = requestProcessor.deserializeRequest(
          data.serializedRequest
        );
        const destUrl = requestProcessor.copyParamsToUrl(
          requestInit.url,
          options.forward
        );

        if (options.verbose) {
          consola.info(JSON.stringify(requestInit, null, 2));
          consola.start(`Forwarding event to "${destUrl}"...`);
        }

        // send it onward!
        try {
          const response = await fetch(destUrl, requestInit);
          consola.success(
            `Forwarded event successfully, with response status: ${response.status}`
          );
          if (options.verbose) {
            consola.info(await response.json());
          }
        } catch (e) {
          if (options.verbose) {
            consola.error(e);
          } else {
            consola.error("Something went wrong forwarding the event.");
          }
        }
      }
    );

    return () => {
      consola.info("Disconnecting...");
      pusherClient.unsubscribe(source.id);
    };
  }, [source?.id]);

  useEffect(() => {
    getSource();
  }, [getSource]);

  useEffect(() => {
    listenForEvents();
  }, [listenForEvents]);

  return null;
}
