import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phone",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;
