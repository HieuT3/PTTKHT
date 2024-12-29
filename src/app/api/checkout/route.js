import { getSession } from "@/middleware/session";
import connectDB from "@/config/DBConnect";
import Order from "@/models/Order";
import Phone from "@/models/phone";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const { fullname, email, address, phone } = await req.json();
    const cartItems = await Promise.all(
      session.user.cart.map(async (cartItem) => {
        const product = await Phone.findById(cartItem.productId);
        return {
          ...cartItem,
          price: product.price,
        };
      })
    );

    const total = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    const order = new Order({
      userId: session.user.id,
      fullname,
      email,
      address,
      phone,
      items: session.user.cart,
      total: total + 29.99,
    });

    await order.save();
    session.user.cart = [];
    await session.save();

    return NextResponse.json(
      { message: "Order placed successfully", orderId: order._id },
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
