"use server";

import { xata } from "@trout.run/shared/server";
import { revalidatePath } from "next/cache";
import {
  NavigationLinks,
  getOrgOrUserId,
  getRandomName,
} from "../app/_utils/isomorphic";

const route = NavigationLinks.find((link) => link.id === "sources").href;

export const CREATE = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const source = await xata.db.sources.create({
    clerkOrgOrUserId: lookupId,
    name: `src-${getRandomName()}`,
  });
  await source.update({
    cliToken: createCLIToken(source.id),
    webhookToken: createWebhookToken(source.id),
  });
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
  const source = await xata.db.sources.read(sourceId);
  if (!source) {
    throw new Error("source not found");
  }
  await xata.db.sources.delete({
    id: source.id,
  });
  // delete all connections as well
  const connections = await xata.db.connections
    .filter({
      source: {
        id: sourceId,
      },
    })
    .getAll();
  await Promise.all(
    connections.map((connection) =>
      xata.db.connections.delete({
        id: connection.id,
      })
    )
  );
  // revalidate the page
  revalidatePath(route);
};

/**
 *
 * @param sourceId - the ID of the source record
 * @returns a value that can be used as the CLI token
 */
export const createCLIToken = (sourceId: string) => {
  // use the record ID to ensure it is unique
  // use the crypto randomUUID to make it harder to guess
  // replace _ with - for consistent formatting
  // replace rec for readability
  return `${sourceId}-${crypto.randomUUID()}`
    .replaceAll("_", "-")
    .replaceAll("rec", "src");
};

/**
 *
 * @param sourceId - the ID of the source record
 * @returns a value that can be used as the CLI token
 */
export const createWebhookToken = (sourceId: string) => {
  // use the record ID to ensure it is unique
  // use the crypto randomUUID to make it harder to guess
  // replace _ with - for consistent formatting
  // replace rec for readability
  return `${sourceId}-${crypto.randomUUID()}`
    .replaceAll("_", "-")
    .replaceAll("rec", "hook");
};
