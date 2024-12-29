import connectDB from "@/config/DBConnect";
import Phone from "@/models/phone";
import { NextResponse } from "next/server";
import { getSession, sessionOptions } from "@/middleware/session";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id } = await params;

    await connectDB();

    const phone = await Phone.findById(id).lean();
    if (!phone) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const session = await getSession(req, new Response());

    console.log("Session:", session);

    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
