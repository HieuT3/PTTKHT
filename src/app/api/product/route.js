import connectDB from "@/config/DBConnect";
import Phone from "@/models/phone";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const phones = await Phone.find({}).lean();
    if (phones != null) {
      return NextResponse.json(phones, { status: 200 });
    }
    return NextResponse.json(
      { message: "Products not found" },
      { status: 404 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
