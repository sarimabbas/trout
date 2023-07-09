import { xata } from "@trout.run/shared/server";
import { NextResponse, type NextRequest } from "next/server";

// returns details about a source by looking at the cli token
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const cliToken = body.cliToken as string;
  if (!cliToken) {
    return new Response("Missing cliToken in body", { status: 400 });
  }

  const source = await xata.db.sources
    .filter({ cliToken })
    .select(["*"])
    .getFirst();

  if (!source) {
    return NextResponse.json({ error: "Invalid CLI token" }, { status: 404 });
  }

  return NextResponse.json(source);
};
