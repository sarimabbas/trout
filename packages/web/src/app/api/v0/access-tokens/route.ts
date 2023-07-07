import { xata } from "@trout/shared/server";
import { NextResponse, type NextRequest } from "next/server";

// returns details about an access token
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const accessToken = body.accessToken as string;
  if (!accessToken) {
    return new Response("Missing accessToken", { status: 400 });
  }
  const accessTokenRecord = await xata.db.accessTokens.read(accessToken);
  return NextResponse.json(accessTokenRecord);
};
