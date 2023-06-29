import { getXataClient } from "./xata";

export const xata = getXataClient();

export * from "./xata";
export type { SelectedPick } from "@xata.io/client";
