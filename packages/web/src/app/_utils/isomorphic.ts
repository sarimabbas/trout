import { auth, useAuth } from "@clerk/nextjs";
import { getApiUrl } from "@trout/shared/isomorphic";
import type { NextRequest } from "next/server";
import crypto from "crypto";
import Haikunator from "haikunator";
import type { SelectedPick, SourcesRecord } from "@trout/shared/server";

export const getOrgOrUserId = () => {
  const { orgId, userId } = auth();
  return orgId ?? userId;
};

export const useOrgOrUserId = () => {
  const { userId, orgId } = useAuth();
  return orgId ?? userId;
};

export const getWebhookUrl = (sourceId: string) => {
  const path = `api/sources/${sourceId}`;
  return `${getApiUrl()}/${path}`;
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

const haikunator = new Haikunator();

export const getRandomSourceName = () => {
  return haikunator.haikunate();
};

export type Source = Readonly<SelectedPick<SourcesRecord, ["*"]>>;