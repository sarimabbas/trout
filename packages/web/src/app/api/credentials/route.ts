import { getKafkaCredentialsForAccessToken } from "@/app/_utils/server";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const accessToken = body.accessToken as string;
  if (!accessToken) {
    return new Response("Missing accessToken", { status: 400 });
  }

  // get credentials for accessToken
  const credentials = await getKafkaCredentialsForAccessToken(accessToken);
  if (!credentials) {
    return new Response("Error creating access credentials", { status: 401 });
  }

  return NextResponse.json(credentials);
};
