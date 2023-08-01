import WaitlistOffboardEmail from "@/components/emails/waitlist-offboard";
import { waitlist } from "@trout.run/shared/isomorphic";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// runs as a cron job everyday via vercel.json
export async function POST() {
  // get access token
  const accessToken = await waitlist.getAccessToken();

  // get waitlist metadata
  const metadata = await waitlist.getWaitlistMeta();

  // offboard 20% of the waitlist during this run
  const total = metadata.statistics.current_waiters;
  const limit = Math.ceil(total * 0.2);

  // find top waitlistees
  const waitlistees = await waitlist.getWaitlistees(accessToken, limit);

  // offboard from waitlist
  const offboarded = await waitlist.offboardWaitlistees(
    accessToken,
    waitlistees.map((w) => w.uuid)
  );

  // send them an email
  const resendResponse = await resend.emails.send({
    from: "Trout <hi@updates.trout.run>",
    reply_to: "Trout <hi@trout.run>",
    to: offboarded.map((w) => w.email),
    subject: "Your invitation to Trout",
    react: WaitlistOffboardEmail({}),
  });

  if (process.env.RUNTIME_ENV === "production") {
    try {
      await fetch(process.env.HEARTBEAT_WAITLIST_OFFBOARD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "success",
          message: `Offboarded ${offboarded.length} waitlistees`,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return NextResponse.json({ resendResponse });
}
