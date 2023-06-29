import { auth, useAuth } from "@clerk/nextjs";
import { SelectedPick, SourcesRecord } from "@trout/xata";
import Haikunator from "haikunator";
import crypto from "crypto";

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
