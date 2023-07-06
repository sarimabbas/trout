"use server";

import { NavigationLinks } from "@/components/navbar/navbar";
import { xata } from "@trout/shared/server";
import { revalidatePath } from "next/cache";
import { getOrgOrUserId, getRandomSourceName } from "../app/_utils/isomorphic";

const route = NavigationLinks.find((link) => link.label === "Sinks").href;

export const createAction = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const sink = await xata.db.sinks.create({
    clerkOrgOrUserId: lookupId,
    name: getRandomSourceName(),
  });
  revalidatePath(route);
  return sink;
};

export const readAction = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const sinks = await xata.db.sinks
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .select(["*"])
    .getAll();
  return sinks;
};

export const updateAction = async (props: {
  sinkId: string;
  name: string;
  url: string;
}) => {
  const { sinkId, name, url } = props;
  if (!sinkId) {
    throw new Error("sinkId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  await xata.db.sinks.update({
    id: sinkId as string,
    name,
    url,
  });
  revalidatePath(route);
};

export const deleteAction = async (props: { sinkId: string }) => {
  const { sinkId } = props;
  if (!sinkId) {
    throw new Error("sinkId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  await xata.db.sinks.delete({
    id: sinkId as string,
  });
  revalidatePath(route);
};
