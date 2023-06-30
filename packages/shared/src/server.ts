import { getXataClient } from "./xata";

export const xata = getXataClient();
export type { SelectedPick } from "@xata.io/client";
export * from "./xata";
