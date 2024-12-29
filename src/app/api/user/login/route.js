import { getSession } from "@/middleware/session";
import connectDB from "@/config/DBConnect";
import User from "@/models/User";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username or password required!" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 400 }
      );
    }

    const session = await getSession();
    if (!session.user)
      session.user = { username: user.username, id: user._id, cart: [] };
    else {
      session.user.username = user.username;
      session.user.id = user._id;
    }
    await session.save();
    console.log(session);
    return NextResponse.json(
      session.user,
      { message: "Login successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
