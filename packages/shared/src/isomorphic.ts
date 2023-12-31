export const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      return `${window.location.origin}`;
    }
    return `http://localhost:3000/`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL;
};

export const getTopicId = (orgOrUserId: string, sourceId: string) => {
  const topic = `${orgOrUserId}.${sourceId}`;
  return topic;
};

export const defaultPusherEventName = "webhook-event";

export * as requestProcessor from "./utils/requestProcessor";

export * as waitlist from "./utils/waitlist";
