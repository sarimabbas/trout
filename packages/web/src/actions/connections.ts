"use server";

import { NavigationLinks } from "@/components/navbar/navbar";
import { xata } from "@trout/shared/server";
import { revalidatePath } from "next/cache";
import { getOrgOrUserId } from "../app/_utils/isomorphic";

const route = NavigationLinks.find((link) => link.label === "Connections").href;

export const CRUPDATE = async ({
  connectionId,
  sourceId,
  sinkId,
}: {
  connectionId?: string;
  sourceId: string;
  sinkId: string;
}) => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  if (!sourceId || !sinkId) {
    throw new Error("sourceId or sinkId is not defined");
  }
  const connectionRecord = await xata.db.connections.createOrReplace({
    id: connectionId,
    clerkOrgOrUserId: lookupId,
    source: {
      id: sourceId,
    },
    sink: {
      id: sinkId,
    },
  });
  revalidatePath(route);
  return connectionRecord;
};

export const READ = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const connections = await xata.db.connections
    .filter({
      clerkOrgOrUserId: lookupId,
    })
    .select(["*", "source.*", "sink.*"])
    .getAll();
  return connections;
};

export const DELETE = async (props: { connectionId: string }) => {
  const { connectionId } = props;
  if (!connectionId) {
    throw new Error("connectionId is not defined");
  }
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }
  const connectionRecord = await xata.db.connections.delete({
    id: connectionId as string,
  });
  revalidatePath(route);
  return connectionRecord;
};
