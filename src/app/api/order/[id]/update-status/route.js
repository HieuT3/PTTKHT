import connectDB from "@/config/DBConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = await params;
    const { status } = await req.json();
    console.log(status);
    await connectDB();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    order.status = status;
    await order.save();
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
