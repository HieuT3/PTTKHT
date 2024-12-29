import { getSession } from "@/middleware/session";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();
  return NextResponse.json(session.user || "", { status: 200 });
};
