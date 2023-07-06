"use server";

import * as kafkaActions from "@/actions/kafka";
import { NavigationLinks } from "@/components/navbar/navbar";
import { xata } from "@trout/shared/server";
import { revalidatePath } from "next/cache";
import { getOrgOrUserId, getRandomName } from "../app/_utils/isomorphic";

const route = NavigationLinks.find(
  (link) => link.label === "Access tokens"
).href;

export const CREATE = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const accessToken = await xata.db.accessTokens.create({
    clerkOrgOrUserId: lookupId,
    name: `tkn-${getRandomName()}`,
  });
  const kafkaCredentials = await kafkaActions.CREATE(accessToken.id, lookupId);
  await xata.db.accessTokens.update({
    id: accessToken.id,
    kafkaCredentialId: kafkaCredentials.credential_id,
    kafkaCredentialUsername: kafkaCredentials.username,
    kafkaCredentialPassword: kafkaCredentials.password,
  });
  revalidatePath(route);
  return accessToken;
};

export const READ = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const accessTokens = await xata.db.accessTokens
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .select(["*"])
    .getAll();
  return accessTokens;
};

export const UPDATE = async (props: {
  accessTokenId: string;
  name: string;
}) => {
  const { accessTokenId, name } = props;
  if (!accessTokenId) {
    throw new Error("accessTokenId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  await xata.db.accessTokens.update({
    id: accessTokenId as string,
    name,
  });
  revalidatePath(route);
};

export const DELETE = async (props: { accessTokenId: string }) => {
  const { accessTokenId } = props;
  if (!accessTokenId) {
    throw new Error("accessTokenId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const accessToken = await xata.db.accessTokens.read(accessTokenId);
  await kafkaActions.DELETE(accessToken.kafkaCredentialId);
  await xata.db.accessTokens.delete({
    id: accessToken.id,
  });
  revalidatePath(route);
};
