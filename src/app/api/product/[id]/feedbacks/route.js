import connectDB from "@/config/DBConnect";
import Phone from "@/models/phone";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";
import { getSession } from "@/middleware/session";

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectDB();

    const feedbacks = await Feedback.find({ phoneId: id })
      .populate("userId")
      .lean();
    if (!feedbacks)
      return NextResponse.json(
        { message: "Feedbacks not found!" },
        { status: 400 }
      );
    return NextResponse.json({ feedbacks: feedbacks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, { params }) => {
  try {
    const { id } = await params;
    const { content } = await req.json();
    await connectDB();
    const session = await getSession();
    if (!session)
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 400 }
      );
    const userId = session.user.id;
    const phoneId = id;
    const feedback = new Feedback({
      userId: userId,
      phoneId: phoneId,
      content: content,
    });
    const data = await feedback.save();
    const saveFeedback = await data.populate("userId");
    return NextResponse.json({ feedback: saveFeedback }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
