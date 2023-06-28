"use server";

import { getRandomSourceName, getOrgOrUserId } from "../_utils";
import { xata } from "@trout/xata";
import { revalidatePath } from "next/cache";

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

// creates a new source
export const createSource = async () => {
  console.log("calling createSource");

  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }

  await xata.db.sources.create({
    clerkOrgOrUserId: lookupId,
    name: getRandomSourceName(),
  });

  revalidatePath("/");
};

// updates an existing source with name
export const editSource = async (formData: FormData) => {
  const sourceId = formData.get("sourceId");
  if (!sourceId) {
    throw new Error("sourceId is not defined");
  }

  const lookupId = getOrgOrUserId();
  if (!lookupId) {
    throw new Error("lookupId is not defined");
  }

  await xata.db.sources.update({
    id: sourceId as string,
    name: formData.get("name") as string,
  });

  revalidatePath("/");
};

// deletes an existing source
export const deleteSource = async (formData: FormData) => {
  const sourceId = formData.get("sourceId");
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
