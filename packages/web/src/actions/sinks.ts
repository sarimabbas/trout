"use server";

import { xata } from "@trout/shared/server";
import { revalidatePath } from "next/cache";
import {
  NavigationLinks,
  getOrgOrUserId,
  getRandomName,
} from "../app/_utils/isomorphic";

const route = NavigationLinks.find((link) => link.label === "Sinks").href;

export const CREATE = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const sink = await xata.db.sinks.create({
    clerkOrgOrUserId: lookupId,
    name: `snk-${getRandomName()}`,
  });
  revalidatePath(route);
  return sink;
};

export const READ = async () => {
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

export const UPDATE = async (props: {
  sinkId: string;
  name?: string;
  url?: string;
  diagramPosX?: number;
  diagramPosY?: number;
}) => {
  const { sinkId, name, url, diagramPosX, diagramPosY } = props;
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
    diagramPosX,
    diagramPosY,
  });
  revalidatePath(route);
};

export const DELETE = async (props: { sinkId: string }) => {
  const { sinkId } = props;
  if (!sinkId) {
    throw new Error("sinkId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const sink = await xata.db.sources.read(sinkId);
  if (!sink) {
    throw new Error("sink not found");
  }
  await xata.db.sinks.delete({
    id: sink.id,
  });
  // delete all connections as well
  const connections = await xata.db.connections
    .filter({
      sink: {
        id: sink.id,
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
