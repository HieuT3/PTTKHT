import connectDB from "@/config/DBConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const GET = async (req) => {
  try {
    await connectDB();
    const users = await User.find({}).lean();
    if (!users)
      return NextResponse.json({ message: "No user found!" }, { status: 400 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
