import { getSession } from "@/middleware/session";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getSession();
    if (!session.user) {
      session.user = { cart: [] };
    }
    return NextResponse.json({ cart: session.user.cart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const { productId, quantity } = await req.json();
    const session = await getSession();

    if (!session.user) {
      session.user = { cart: [] };
    }

    if (!session.user.cart) {
      session.user.cart = [];
    }

    const cart = session.user.cart;

    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
      session.user.cart = cart;
    }

    await session.save();

    return NextResponse.json({ cart: session.user.cart }, { status: 200 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const session = await getSession();
  const { productId, quantity } = await req.json();
  console.log(productId, quantity);
  try {
    if (!session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const cartItemIndex = session.user.cart.findIndex(
      (item) => item.productId === productId
    );
    if (cartItemIndex !== -1) {
      session.user.cart[cartItemIndex].quantity = quantity;
      console.log(session.user.cart);
      await session.save();
      return NextResponse.json({ cart: session.user.cart }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Item not found in cart" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const { productId } = await req.json();
    const session = await getSession();

    if (!session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!session.user.cart) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    session.user.cart = session.user.cart.filter(
      (item) => item.productId !== productId
    );

    await session.save();

    return NextResponse.json({ cart: session.user.cart }, { status: 200 });
  } catch (error) {
    console.error("Error deleting from cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
