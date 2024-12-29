import connectDB from "@/config/DBConnect";
import Phone from "@/models/phone";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { message: "Invalid request, 'ids' should be an array" },
        { status: 400 }
      );
    }

    const phones = await Phone.find({ _id: { $in: ids } });
    return NextResponse.json(phones, { status: 200 });
  } catch (error) {
    console.error("Error fetching phones:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
