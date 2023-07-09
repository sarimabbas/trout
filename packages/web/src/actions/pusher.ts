import { getPrivateEnv } from "@trout/shared/isomorphic";
import Pusher from "pusher";

const privateEnv = getPrivateEnv();

export const pusher = new Pusher({
  appId: privateEnv.PUSHER_APP_ID,
  key: privateEnv.PUSHER_KEY,
  secret: privateEnv.PUSHER_SECRET,
  cluster: "us2",
  useTLS: true,
});

export const defaultPusherChannel = "webhook-event";
