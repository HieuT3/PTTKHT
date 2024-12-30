import { getSession } from "@/middleware/session";
import { NextResponse } from "next/server";
import connectDB from "@/config/DBConnect";
import Order from "@/models/Order";

export const GET = async () => {
  try {
    const session = await getSession();
    if (!session.user)
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
    await connectDB();
    const orders = await Order.find({ userId: session.user.id });
    return NextResponse.json({ orders: orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
