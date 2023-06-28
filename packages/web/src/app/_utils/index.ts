import { auth } from "@clerk/nextjs";
import { SelectedPick, SourcesRecord } from "@trout/xata";
import Haikunator from "haikunator";

const haikunator = new Haikunator();

export const getOrgOrUserId = () => {
  const { orgId, userId } = auth();
  return orgId ?? userId;
};

export const getRandomSourceName = () => {
  return haikunator.haikunate();
};

export type Source = Readonly<SelectedPick<SourcesRecord, ["*"]>>;
