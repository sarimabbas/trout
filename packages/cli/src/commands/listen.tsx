import { Text } from "ink";
import { useCallback, useEffect, useState } from "react";
import zod from "zod";
import {
  IApiCredentialsResponse,
  getCredentialsForAccessToken,
} from "../utils.js";

export const options = zod.object({
  sourceId: zod.string().describe("Source ID"),
  accessToken: zod.string().describe("Access token"),
});

type Props = {
  options: zod.infer<typeof options>;
};

export default function Listen({ options }: Props) {
  const [credentials, setCredentials] = useState<IApiCredentialsResponse>();

  const getCredentials = useCallback(async () => {
    const credentials = await getCredentialsForAccessToken(options.accessToken);
    setCredentials(credentials);
  }, [options.accessToken]);

  useEffect(() => {
    getCredentials();
  }, [getCredentials]);

  return (
    <Text>
      Hello, <Text color="green">{JSON.stringify(credentials)}</Text>
    </Text>
  );
}
