import { getSession } from "@/middleware/session";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getSession();
    if (!session.user)
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 400 }
      );
    session.destroy();
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
