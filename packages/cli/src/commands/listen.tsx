import { defaultPusherChannel } from "@trout.run/shared/isomorphic";
import { SourcesRecord } from "@trout.run/shared/server";
import { Text } from "ink";
import { useCallback, useEffect, useState } from "react";
import zod from "zod";
import { pusherClient } from "../utils";

export const options = zod.object({
  source: zod.string().describe("CLI token for the source"),
});

type Props = {
  options: zod.infer<typeof options>;
};

export default function Listen({ options }: Props) {
  const [source, setSource] = useState<SourcesRecord>();

  const getSource = useCallback(async () => {
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

    const channel = pusherClient.subscribe(source.id);
    channel.bind(defaultPusherChannel, (data: string) => {
      console.log({ data });
    });

    return () => {
      console.log("Disconnecting consumer...");
      pusherClient.unsubscribe(source.id);
    };
  }, [source?.id]);

  useEffect(() => {
    getSource();
  }, [getSource]);

  useEffect(() => {
    listenForEvents();
  }, [listenForEvents]);

  return source?.id ? (
    <Text>
      Listening for events on source <Text color="green">{source.name}</Text>...
    </Text>
  ) : (
    <Text>Waiting for source...</Text>
  );
}
