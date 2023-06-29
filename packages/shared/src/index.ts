import { getXataClient } from "./xata";

export const xata = getXataClient();

export * from "./xata";
export type { SelectedPick } from "@xata.io/client";

export const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      return `${window.location.origin}`;
    }
    return `http://localhost:3000/`;
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`;
};

export * from "./env";
