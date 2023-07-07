"use server";

import { xata } from "@trout/shared/server";
import { revalidatePath } from "next/cache";
import { getOrgOrUserId, getRandomName } from "../app/_utils/isomorphic";
import { createTopic, deleteTopic } from "../app/api/sources/[sourceId]/route";
import { getTopicId } from "@trout/shared/isomorphic";
import { NavigationLinks } from "@/components/navbar/navbar";

const route = NavigationLinks.find((link) => link.label === "Sources").href;

export const CREATE = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const source = await xata.db.sources.create({
    clerkOrgOrUserId: lookupId,
    name: `src-${getRandomName()}`,
  });
  // create topic in kafka if it doesn't exist
  // the userID is used as a topic prefix
  try {
    await createTopic(getTopicId(source.clerkOrgOrUserId, source.id));
  } catch (e) {
    console.error(e);
  }
  revalidatePath(route);
  return source;
};

export const READ = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const sources = await xata.db.sources
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .select(["*"])
    .getAll();
  return sources;
};

export const UPDATE = async (props: {
  sourceId: string;
  name?: string;
  diagramPosX?: number;
  diagramPosY?: number;
}) => {
  const { sourceId, name, diagramPosX, diagramPosY } = props;
  if (!sourceId) {
    throw new Error("sourceId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  await xata.db.sources.update({
    id: sourceId as string,
    name,
    diagramPosX,
    diagramPosY,
  });
  revalidatePath(route);
};

export const DELETE = async (props: { sourceId: string }) => {
  const { sourceId } = props;
  if (!sourceId) {
    throw new Error("sourceId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  await xata.db.sources.delete({
    id: sourceId as string,
  });
  // delete from Kafka as well
  try {
    await deleteTopic(getTopicId(lookupId, sourceId));
  } catch (e) {
    console.error(e);
  }
  revalidatePath(route);
};
