import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string(),
    KAFKA_BROKER: z.string(),
    KAFKA_PASSWORD: z.string(),
    KAFKA_USERNAME: z.string(),
    KAFKA_CLUSTER_ID: z.string(),
    UPSTASH_ADMIN_API_KEY: z.string(),
    UPSTASH_ADMIN_EMAIL: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
