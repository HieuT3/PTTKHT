import connectDB from "@/config/DBConnect";
import Phone from "@/models/phone";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const phone = await Phone.findById(id).lean();
    if (!phone) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = await params;
    const { title, price, quantity, imageurl } = await req.json();

    const phone = await Phone.findById(id);
    if (!phone) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    phone.title = title || phone.title;
    phone.price = price || phone.price;
    phone.quantity = quantity || phone.quantity;
    phone.imageurl = imageurl || phone.imageurl;
    await phone.save();

    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = await params;

    const phone = await Phone.findById(id);
    if (!phone) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const result = await Phone.findByIdAndDelete(id);
    console.log("delete");
    console.log(result);
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
