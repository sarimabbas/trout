"use server";

import { xata } from "@trout/shared/server";
import { revalidatePath } from "next/cache";
import { getOrgOrUserId, getRandomSourceName } from "../_utils/isomorphic";

// fetches all sources
export const getSources = async () => {
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

export type IGetSources = typeof getSources;

// creates a new source
export const createSource = async () => {
  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }

  const source = await xata.db.sources.create({
    clerkOrgOrUserId: lookupId,
    name: getRandomSourceName(),
  });

  revalidatePath("/");

  return source;
};

export type ICreateSource = typeof createSource;

// updates an existing source with name
export const editSource = async (props: { sourceId: string; name: string }) => {
  const { sourceId, name } = props;
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
  });

  revalidatePath("/");
};

export type IEditSource = typeof editSource;

// deletes an existing source
export const deleteSource = async (props: { sourceId: string }) => {
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

  revalidatePath("/");
};

export type IDeleteSource = typeof deleteSource;
