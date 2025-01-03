import { NextResponse } from "next/server";
import connectDB from "@/config/DBConnect";
import Order from "@/models/Order";

export const GET = async () => {
  try {
    await connectDB();
    const orders = await Order.find({});
    return NextResponse.json({ orders: orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
