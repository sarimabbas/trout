import { Client } from "@upstash/qstash";

export const upstash = new Client({
  token: process.env.QSTASH_TOKEN,
});
