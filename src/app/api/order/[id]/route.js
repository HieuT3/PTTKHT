import connectDB from "@/config/DBConnect";
import Order from "@/models/Order";
import Phone from "@/models/phone";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  try {
    const { params } = context;
    const { id } = await params;

    await connectDB();

    const order = await Order.findById(id).populate("items.productId");
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
