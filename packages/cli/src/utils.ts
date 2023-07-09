import Pusher from "pusher-js";

export const pusherClient = new Pusher(process.env.PUSHER_KEY!, {
  cluster: "us2",
});
