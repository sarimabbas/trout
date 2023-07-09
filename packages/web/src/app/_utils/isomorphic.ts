import { auth, useAuth } from "@clerk/nextjs";
import { getApiUrl } from "@trout.run/shared/isomorphic";
import Haikunator from "haikunator";
import type { NextRequest } from "next/server";

export const getOrgOrUserId = () => {
  const { orgId, userId } = auth();
  return orgId ?? userId;
};

export const useOrgOrUserId = () => {
  const { userId, orgId } = useAuth();
  return orgId ?? userId;
};

export const getWebhookUrl = (webhookToken: string) => {
  const path = `api/v0/sources/${webhookToken}`;
  return `${getApiUrl()}/${path}`;
};

export const getCliCommand = (cliToken: string) => {
  return `trout listen --source ${cliToken}`;
};

export const serializeRequest = (req: Request) => {
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

export const getRandomName = () => {
  return haikunator.haikunate();
};

export const NavigationLinks = [
  {
    href: "/",
    label: "Sources",
  },
  {
    href: "/sinks",
    label: "Sinks",
  },
  {
    href: "/connections",
    label: "Connections",
  },
] as const;
