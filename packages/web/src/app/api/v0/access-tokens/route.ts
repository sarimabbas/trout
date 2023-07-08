import { xata } from "@trout/shared/server";
import { NextResponse, type NextRequest } from "next/server";

// returns details about an access token by looking at its value
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const accessToken = body.accessToken as string;
  if (!accessToken) {
    return new Response("Missing accessToken in body", { status: 400 });
  }

  const accessTokenRecord = await xata.db.accessTokens
    .filter({ value: accessToken })
    .select(["*"])
    .getFirst();

  if (!accessTokenRecord) {
    return NextResponse.json(
      { error: "Invalid access token" },
      { status: 404 }
    );
  }

  return NextResponse.json(accessTokenRecord);
};
