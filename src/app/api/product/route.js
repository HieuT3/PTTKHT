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

export const POST = async (req) => {
  try {
    await connectDB();
    const { title, price, quantity, imageurl } = await req.json();

    const newProduct = new Phone({
      title,
      price,
      quantity,
      imageurl,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

