import { auth, useAuth } from "@clerk/nextjs";
import { getApiUrl } from "@trout.run/shared/isomorphic";
import Haikunator from "haikunator";
import { Inbox, Link, Send } from "lucide-react";

export const getOrgOrUserId = () => {
  const { orgId, userId } = auth();
  return orgId ?? userId;
};

export const useOrgOrUserId = () => {
  const { userId, orgId } = useAuth();
  return orgId ?? userId;
};

export const getWebhookUrl = (webhookToken: string) => {
  const path = `api/v0/sources/${webhookToken}`;
  return `${getApiUrl()}/${path}`;
};

export const getCliCommand = (cliToken: string) => {
  return `trout listen --source ${cliToken}`;
};

const haikunator = new Haikunator();

export const getRandomName = () => {
  return haikunator.haikunate();
};

export const NavigationLinks = [
  {
    id: "sources",
    href: "/",
    label: "Sources",
    icon: <Inbox size={16} className="opacity-50" />,
  },
  {
    id: "sinks",
    href: "/sinks",
    label: "Sinks",
    icon: <Send size={16} className="opacity-50" />,
  },
  {
    id: "connections",
    href: "/connections",
    label: "Connections",
    icon: <Link size={16} className="opacity-50" />,
  },
] as const;
