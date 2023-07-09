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
