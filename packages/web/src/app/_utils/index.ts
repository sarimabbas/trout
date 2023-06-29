import { auth, useAuth } from "@clerk/nextjs";
import { SelectedPick, SourcesRecord } from "@trout/shared";
import Haikunator from "haikunator";
import crypto from "crypto";
import { NextRequest } from "next/server";

const haikunator = new Haikunator();

export const getOrgOrUserId = () => {
  const { orgId, userId } = auth();
  return orgId ?? userId;
};

export const getRandomSourceName = () => {
  return haikunator.haikunate();
};

export type Source = Readonly<SelectedPick<SourcesRecord, ["*"]>>;

export const useOrgOrUserId = () => {
  const { userId, orgId } = useAuth();
  return orgId ?? userId;
};

export const getWebhookUrl = (sourceId: string) => {
  const path = `api/sources/${sourceId}`;

  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/${path}`;
    }

    return `http://localhost:3000/${path}`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${path}`;
};

export const getCliCommand = (orgOrUserId: string, sourceId: string) => {
  return `trout listen --id ${sourceId} --access-token ${getRootAccessToken(
    orgOrUserId
  )}`;
};

export const getRootAccessToken = (orgOrUserId: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(orgOrUserId);
  return hash.digest("hex");
};

export const serializeRequest = (req: NextRequest) => {
  return JSON.stringify(req, [
    "body",
    "cookies",
    "headers",
    "method",
    "url",
    "credentials",
    "destination",
    "geo",
    "integrity",
    "ip",
    "keepalive",
    "mode",
    "nextUrl",
    "redirect",
    "referrer",
    "referrerPolicy",
  ]);
};

export const deserializeRequest = (serializedRequest: string) => {
  return JSON.parse(serializedRequest);
};
