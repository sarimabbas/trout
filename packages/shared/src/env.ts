import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
});

const serverEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string(),
  KAFKA_BROKER: z.string(),
  KAFKA_PASSWORD: z.string(),
  KAFKA_USERNAME: z.string(),
  KAFKA_CLUSTER_ID: z.string(),
  UPSTASH_ADMIN_API_KEY: z.string(),
  UPSTASH_ADMIN_EMAIL: z.string(),
});

export const getClientEnv = () => {
  return clientEnvSchema.parse(process.env);
};

export const getServerEnv = () => {
  return serverEnvSchema.parse(process.env);
};
