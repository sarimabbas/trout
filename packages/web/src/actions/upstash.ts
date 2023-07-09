import { getPrivateEnv } from "@trout/shared/isomorphic";
import { Client } from "@upstash/qstash";

const privateEnv = getPrivateEnv();

export const upstash = new Client({
  token: privateEnv.QSTASH_TOKEN,
});
