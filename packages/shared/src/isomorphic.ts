import { z } from "zod";

export const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      return `${window.location.origin}`;
    }
    return `http://localhost:3000/`;
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`;
};

const privateEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string(),
  KAFKA_BROKER: z.string(),
  KAFKA_PASSWORD: z.string(),
  KAFKA_USERNAME: z.string(),
  KAFKA_CLUSTER_ID: z.string(),
  UPSTASH_ADMIN_API_KEY: z.string(),
  UPSTASH_ADMIN_EMAIL: z.string(),
});

export const getPrivateEnv = () => {
  return privateEnvSchema.parse(process.env);
};

const publicEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
});

export const getPublicEnv = () => {
  return publicEnvSchema.parse(process.env);
};

export const getTopicId = (orgOrUserId: string, sourceId: string) => {
  const topic = `${orgOrUserId}.${sourceId}`;
  return topic;
};
