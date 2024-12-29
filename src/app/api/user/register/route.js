import connectDB from "@/config/DBConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getSession } from "@/middleware/session";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();
    if (!username || !password) {
      console.log("User name or password required!");
      return NextResponse.json(
        { message: "User name or password required!" },
        { status: 400 }
      );
    }
    const existingUser = await User.find({ username: username });
    if (!existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );

    const hashedPassword = await hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    const saveUser = await newUser.save();

    const session = await getSession();
    session.user = { username: saveUser.username, id: saveUser._id, cart: [] };
    await session.save();
    return NextResponse.json(session.user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
