import { AccessTokensRecord } from "@trout/shared/server";
import { Text } from "ink";
import { useCallback, useEffect, useState } from "react";
import zod from "zod";
import { getAccessTokenDetails, pusherClient } from "../utils";

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

    console.log("Listening for messages...");

    const channel = pusherClient.subscribe(options.sourceId);

    channel.bind("webhook-event", (data: string) => {
      console.log({ data });
    });

    return () => {
      console.log("Disconnecting consumer...");
      pusherClient.unsubscribe(options.sourceId);
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
