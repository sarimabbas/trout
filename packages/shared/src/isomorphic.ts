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
  UPSTASH_ADMIN_API_KEY: z.string(),
  UPSTASH_ADMIN_EMAIL: z.string(),
  PUSHER_APP_ID: z.string(),
  PUSHER_KEY: z.string(),
  PUSHER_SECRET: z.string(),
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

export const ZWebRequest = z.preprocess(
  (val) => {
    return JSON.parse(val as string);
  },
  z.object({
    body: z.any(),
    cookies: z.any(),
    headers: z.any(),
    method: z.any(),
    url: z.any(),
    credentials: z.any(),
    destination: z.any(),
    geo: z.any(),
    integrity: z.any(),
    ip: z.any(),
    keepalive: z.any(),
    mode: z.any(),
    nextUrl: z.any(),
    redirect: z.any(),
    referrer: z.any(),
    referrerPolicy: z.any(),
  })
);

export const defaultPusherChannel = "webhook-event";
