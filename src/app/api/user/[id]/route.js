import connectDB from "@/config/DBConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { hash } from "bcryptjs";

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectDB();
    const user = await User.findById(id).lean();
    if (!user)
      return NextResponse.json({ message: "User not found!" }, { status: 400 });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectDB();
    const { username, fullname, email, password, role } = await req.json();
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({ message: "User not found!" }, { status: 400 });
    const newPass = await hash(password, 10);
    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.role = role || user.role;
    user.password = newPass || user.password;
    await user.save();
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
